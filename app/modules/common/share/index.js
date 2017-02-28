import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import Menu from 'react-mdl/lib/Menu';

let seq = 0;
let injected = false;

class ShareButton extends Component {
  componentWillMount() {
    seq += 1;
    this.setState({ seq });
  }
  componentDidMount() {
    if (!injected) {
      window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"1","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16}}; // eslint-disable-line
      document.body.appendChild(document.createElement('script'))
        .src = `http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=${~(-new Date() / 36e5)}`; // eslint-disable-line
      injected = true;
    }
  }
  render() {
    const id = `_share_button_${this.state.seq}`;
    return (
      <div style={{ position: 'relative' }}>
        <IconButton name="share" ripple id={id} />
        <Menu target={id} ripple align="right">
          <div className="bdsharebuttonbox" style={{ width: 71, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 'auto' }}>
            <a className="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a>
            <a className="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a>
            <a className="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a>
            <a className="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a>
            <a className="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ好友</a>
          </div>
        </Menu>
      </div>
    );
  }
}

export default ShareButton;
