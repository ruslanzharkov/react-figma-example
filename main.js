require('dotenv').config()
const fetch = require('node-fetch');
const fs = require('fs');
const figma = require('./lib/figma');
const express = require('express');

const app =  express();

app.get('/figma/update', (req, res) => {
  console.log('--begin')
  updatePage(res);
})

const updatePage = (res) => {
  let headers = new fetch.Headers();
  let componentList = [];
  let devToken = process.env.DEV_TOKEN;
  headers.append('X-Figma-Token', devToken);

  let fileKey = process.argv[2];
  let baseUrl = 'https://api.figma.com';

  let vectorMap = {};
  let vectorList = [];
  let vectorTypes = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'];

  function preprocessTree(node) {
    let vectorsOnly = node.name.charAt(0) !== '#';
    let vectorVConstraint = null;
    let vectorHConstraint = null;

    function paintsRequireRender(paints) {
      if (!paints) return false;

      let numPaints = 0;
      for (let paint of paints) {
        if (paint.visible === false) continue;

        numPaints++;
        if (paint.type === 'EMOJI') return true;
      }

      return numPaints > 1;
    }

    if (paintsRequireRender(node.fills) ||
        paintsRequireRender(node.strokes) ||
        (node.blendMode != null && ['PASS_THROUGH', 'NORMAL'].indexOf(node.blendMode) < 0)) {
      node.type = 'VECTOR';
    }

    let children = node.children && node.children.filter((child) => child.visible !== false);
    if (children) {
      for (let j=0; j<children.length; j++) {
        if (vectorTypes.indexOf(children[j].type) < 0) vectorsOnly = false;
        else {
          if (vectorVConstraint != null && children[j].constraints.vertical != vectorVConstraint) vectorsOnly = false;
          if (vectorHConstraint != null && children[j].constraints.horizontal != vectorHConstraint) vectorsOnly = false;
          vectorVConstraint = children[j].constraints.vertical;
          vectorHConstraint = children[j].constraints.horizontal;
        }
      }
    }
    node.children = children;

    if (children && children.length > 0 && vectorsOnly) {
      node.type = 'VECTOR';
      node.constraints = {
        vertical: vectorVConstraint,
        horizontal: vectorHConstraint,
      };
    }

    if (vectorTypes.indexOf(node.type) >= 0) {
      node.type = 'VECTOR';
      vectorMap[node.id] = node;
      vectorList.push(node.id);
      node.children = [];
    }

    if (node.children) {
      for (let child of node.children) {
        preprocessTree(child);
      }
    }
  }

  async function main() {
    console.log('1');
    let resp = await fetch(`${baseUrl}/v1/files/a9ukC7nDt2tSOa0QVqhr3oqy`, {headers});
    console.log('2');
    let data = await resp.json();
    console.log('3');

    let doc = data.document;
    let canvas = doc.children[0];
    let html = '';

    for (let i=0; i<canvas.children.length; i++) {
      let child = canvas.children[i]
      if (child.name.charAt(0) === '#'  && child.visible !== false) {
        let child = canvas.children[i];
        preprocessTree(child);
      }
    }
    
    let guids = vectorList.join(',');
    data = await fetch(`${baseUrl}/v1/images/a9ukC7nDt2tSOa0QVqhr3oqy?ids=${guids}&format=svg`, {headers});
    let imageJSON = await data.json();

    let images = imageJSON.images || {};
    if (images) {
      let promises = [];
      let guids = [];
      for (let guid in images) {
        if (images[guid] == null) continue;
        guids.push(guid);
        promises.push(fetch(images[guid]));
      }

      let responses = await Promise.all(promises);
      promises = [];
      for (let resp of responses) {
        promises.push(resp.text());
      }

      responses = await Promise.all(promises);
      for (let i=0; i<responses.length; i++) {
        images[guids[i]] = responses[i].replace('<svg ', '<svg preserveAspectRatio="none" ');
      }
    }

    let componentMap = {};
    let contents = `import React, { PureComponent } from 'react';\n`;
    let nextSection = '';

    for (let i=0; i<canvas.children.length; i++) {
      let child = canvas.children[i]
      if (child.name.charAt(0) === '#' && child.visible !== false) {
        let child = canvas.children[i];
        figma.createComponent(child, images, componentMap);
        nextSection += `export class Master${child.name.replace(/\W+/g, "")} extends PureComponent {\n`;
        nextSection += "  render() {\n";
        nextSection += `    return <div className="master" style={{backgroundColor: "${figma.colorString(child.backgroundColor)}"}}>\n`;
        nextSection += `      <C${child.name.replace(/\W+/g, "")} {...this.props} nodeId="${child.id}" />\n`;
        nextSection += "    </div>\n";
        nextSection += "  }\n";
        nextSection += "}\n\n";
      }
    }

    let imported = {};
    for (const key in componentMap) {
      let component = componentMap[key];
      let name = component.name;
      if (!imported[name]) {
        contents += `import { ${name} } from './components/${name}';\n`;
      }
      imported[name] = true;
    }
    contents += "\n";
    contents += nextSection;
    nextSection = '';

    contents += `export function getComponentFromId(id) {\n`;

    for (let key in componentMap) {
      contents += `  if (id === "${key}") return ${componentMap[key].instance};\n`;
      nextSection += componentMap[key].doc + "\n";
    }

    contents += "  return null;\n}\n\n";
    contents += nextSection;

    let path = "./src/figmaComponents.js";
    try {
      fs.writeFile(path, contents, function(err) {
        if (err) console.log(err);
        console.log('updatePage')
        res.send({status: 'ok'});
      });
    } catch(err) {
      res.sendStatus(500);
    }
  }
}

app.listen(8080, () => {
  console.log('Server is up for figma api:)');
})

if (process.argv.length > 3) {
  devToken = process.argv[3];
}

