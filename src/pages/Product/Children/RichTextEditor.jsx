import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function RichTextEditor(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    const values = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(editorState, values);
    props.getEditorValue(values)

    setEditorState(editorState)
  };

  const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          // console.log(response);
          resolve({ data: { link: response.data.url } })
          // resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  console.log(props);

  useEffect(() => {
    if (props.detail) {
      const html = props.detail
     
      console.log(html);
      if (html) {
        const contentBlock = htmlToDraft(html);
        props.getEditorValue(html)
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
          console.log(editorState);

        }
      }
    }
    // eslint-disable-next-line
  }, [])





  return (
    <div>
      <Editor
        editorState={editorState}
        defaultEditorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        editorStyle={{ border: "2px solid #e4e4e4", height: 200, padding: "0 10px" }}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          data: { uploadCallback: true },
          list: { inDropdown: true },
          link: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
        }}
      />
    </div>
  );
}

export default RichTextEditor;