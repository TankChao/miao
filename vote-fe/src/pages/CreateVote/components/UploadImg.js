import React, { useEffect, useState } from 'react';
import './UploadImg.less'
import axios from 'axios'

import ImgCrop from 'antd-img-crop';
import { Upload, Modal, Radio, Button, Tooltip } from 'antd';
import { PlusOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios';

import store from '../../../redux/configureStore'
import { getUserIsLogin, holdVoteImgUrl, defaultVoteImgUrl } from '../../../redux/action/actionCreators.js'


const UploadImg = (props) => {
  // state.voteImg = '默认 url';为了提交表单的时候使用
  useEffect(() => {
    const action_default_vote_img = defaultVoteImgUrl();
    store.dispatch(action_default_vote_img)
  }, [])

  // 这里的 url 为了 <img /> 标签使用
  const defaultFileList = [{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'http://localhost:8081/resources/vote_img/default.png',
  }]
  const [fileList, setFileList] = useState(defaultFileList);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(fileList[0].url);

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const UploadProps = {
    name: 'img',
    action: 'http://localhost:3000/createvoteimg',
    showUploadList: false,
    /* showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'download ',
      showRemoveIcon: true,
      removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
    }, */
    fileList: fileList,
    onPreview: onPreview,
    onChange({ file, fileList }) {

      if (file.status === 'done') {
        fileList = fileList.slice(-1).map(item => {
          item.url = item.response.imgOnlineUrl
          return item
        })
        setFileList(fileList)
        console.log("fileListdddddddddddddd::::::", fileList)
        // state.voteImg = '最新上传图片的 url'
        const action_vote_img = holdVoteImgUrl(fileList[0].url)
        store.dispatch(action_vote_img)
      }
    },
    beforeUpload(file) {
      //console.log('smyhvae handleBeforeUpload file:' + JSON.stringify(file));
      //console.log('smyhvae handleBeforeUpload file.file:' + JSON.stringify(file.file));
      //console.log('smyhvae handleBeforeUpload file type:' + JSON.stringify(file.type));

      //限制图片 格式、size、分辨率
      const isJPG = file.type === 'image/jpeg';
      const isJPEG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 / 8 < 1;
      if (!(isJPG || isJPEG || isPNG)) {
        Modal.error({
          title: '只能上传JPG、JPEG、PNG格式的图片~',
        });
      } else if (!isLt2M) {
        Modal.error({
          title: '图片超过8M限制，不允许上传~',
        });
      }
      return (isJPG || isJPEG || isPNG) && isLt2M;
    }
  }

  const restoreDefault = e => {
    setFileList(defaultFileList);
    const action_default_vote_img = defaultVoteImgUrl();
    store.dispatch(action_default_vote_img)
  }
  return (
    <>
      <div className="vote-img">
        <img src={fileList[0].url} />
      </div>
      <div className="btn-img">
        <ImgCrop rotate aspect={4 / 5}>
          <Upload
            {...UploadProps}
          /* beforeUpload={beforeUpload} */
          >
            <Button><Tooltip title='请上传JPG、JPEG、PNG格式，且小于 8 M'>上传|替换</Tooltip></Button>
          </Upload>
        </ImgCrop>
        <Button onClick={(e) => restoreDefault(e)}>默认封面</Button>
      </div>
    </>
  );
}

export default UploadImg;