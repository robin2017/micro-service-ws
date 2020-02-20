/**
 * 修改第三方包内容
 * */
const path = require('path');
const fs = require('fs');
const vueWcWrapperPath = path.resolve(__dirname, '../node_modules/@vue/web-component-wrapper/dist/vue-wc-wrapper.js');
const resolveWcEntryPath = path.resolve(__dirname, '../node_modules/@vue/cli-service/lib/commands/build/resolveWcEntry.js');

const wrapper_fragment_source_1 = `function wrap (Vue, Component) {`;
const wrapper_fragment_target_1 = `\r\nfunction wrap (Vue, Component,options) {`;
const wrapper_fragment_source_2 = `wrapper.$mount();`;
const wrapper_fragment_target_2 = `\r\n       ` + wrapper_fragment_source_2 + `
       //模仿vue-custom-element添加样式
        if(options && options.shadowLink){
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = options.shadowLink;
          this.shadowRoot.appendChild(link)
        }`;
const entry_fragment_source_1 = `const { camelName, kebabName } = exports.fileToComponentName(prefix, component)`;
const entry_fragment_target_1 = `\r\n  ${entry_fragment_source_1}\r\n  const elementCssLink = '../lib/element.min.css'`;
const entry_fragment_source_2 = `\`window.customElements.define('\${kebabName}', wrap(Vue, \${camelName}))\\n\``;
const entry_fragment_target_2 = `\r\n      \`window.customElements.define('\${kebabName}', wrap(Vue, \${camelName},{shadowLink:'\${elementCssLink}'}))\\n\``;

/**
 * 代码片段修改
 * 1、source中不要包含换行符
 * 2、source必须是唯一的，不要出现多次
 * */
function replaceFragment(id, filePath, source, target) {
    const content_flag = `脚本自动修改-${id}`;
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes(content_flag)) {
        return;
    }
    let index = content.indexOf(source);
    content = content.slice(0, index)
        + `\r\n/*修改前代码：  ${source}  */`
        + `\r\n//==========${content_flag}===(开始)========`
        + target
        + `\r\n//==========${content_flag}===(结束)========`
        + content.slice(index + source.length);
    fs.writeFileSync(filePath, content);
}

function modify() {
    replaceFragment(1, vueWcWrapperPath, wrapper_fragment_source_1, wrapper_fragment_target_1);
    replaceFragment(2, vueWcWrapperPath, wrapper_fragment_source_2, wrapper_fragment_target_2);
    replaceFragment(3, resolveWcEntryPath, entry_fragment_source_1, entry_fragment_target_1);
    replaceFragment(4, resolveWcEntryPath, entry_fragment_source_2, entry_fragment_target_2);
    console.log('完成第三方包@vue/cli-service和@vue/web-component-wrapper的修改')
}

modify();