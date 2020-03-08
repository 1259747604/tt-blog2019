import 'highlight.js/styles/hybrid.css';
import hljs from 'highlight.js';

let config = {
  theme: 'snow',
  placeholder: '来写下这个小弟的入伙信息吧......',
  modules: {
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['image']
    ],
    syntax: {
      highlight: text => {
        return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
      }
    }
  }
};
export default config;
