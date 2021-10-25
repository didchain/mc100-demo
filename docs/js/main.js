const SwitchBtnId = 'switchBtn';
window.devidceSockConnected = false;
window.loginShow = true;

var AppConfig = {
  tabAccTagId: 'tabAccount',
  tabDeviceTagId: 'tabDevice',
  tabQRcodeTagId: 'tabQRcode',
  wsPort: 2693,
};

function setCaretPosition() {
  $('#signData').val('');
  $('#signData').focus();
}

/**
 *
 * @param {string} id
 */
function setLoginInnerShow(id) {
  $('.login-inner-wrapper').addClass('did-hide');
  $('#' + id + 'Box').removeClass('did-hide');
}

/**
 * Bind login box switch Tabs
 */
function bindTabsSwitch() {
  $('.did-tab').on('click', function (e) {
    // clear scan result
    setDevideResultHide();

    if (!$(this).hasClass('is-active')) {
      $('.did-tab').removeClass('is-active');
      $(this).addClass('is-active');
    }

    setLoginInnerShow(this.id);

    try {
      if (this.id === 'tabDevice') {
        open_connections();
      }
    } catch (err) {
      console.error(e);
      setConnectedStatus(false);
    }
  });
}

/**
 * Bind light operate button
 */
function bindLightSwitchTabs() {
  $('#lightOn').click(function () {
    if (window.devidceSockConnected && window.websocketCtrl) {
      websocketCtrl.send('lighton');
      $('.light-switch-tab').removeClass('is-active');
      $(this).addClass('is-active');
    }
  });

  $('#lightOff').click(function () {
    if (window.devidceSockConnected && window.websocketCtrl) {
      websocketCtrl.send('lightoff');
      $('.light-switch-tab').removeClass('is-active');
      $(this).addClass('is-active');
    }
  });
  // $('.light-switch-tab').on('click', function (e) {
  //   if (!devidceSockConnected) {
  //     // alert('当前扫码设备未连接状态,参考帮助文档检查本地程序是否运行?');
  //     $('.light-switch-tab').removeClass('is-active');
  //     $(this).addClass('is-active');
  //   } else {
  //     $('.light-switch-tab').removeClass('is-active');
  //     $(this).addClass('is-active');
  //   }
  // });
}

/**
 * Bind help
 */
function bindDeviceHelpBtn() {
  $('#didDeviceHelpBtn').on('click', function () {
    window.open('./device-help.html', '扫码设备帮助');
  });
}

/**
 * Close Modal
 */
function bindCloseModal() {
  $('#didModal>button.modal-close').click(function () {
    $('#didModal').removeClass('is-active');
  });
}

/**
 * show Modal
 * @param {string} text
 */
function setDevideResultShow(text) {
  $('#deviceResultContainer').removeClass('did-hide');
  $('#deviceResultContainer p.text').text(text);
}

/**
 * 隐藏Modal
 */
function setDevideResultHide() {
  $('#deviceResultContainer').addClass('did-hide');
  $('#deviceResultContainer p.text').text('');
}

/**
 * start connected
 */
function open_connections() {
  if (typeof window.WebSocket !== 'function') {
    throw new Error('The browser unsupport Websocket.');
  }

  if (!window.devidceSockConnected) {
    var host = 'ws://localhost:' + AppConfig.wsPort;

    window.websocketCtrl = new WebSocket(host, 'ctrl');

    websocketCtrl.onerror = function (evt) {
      // console.log('>>>>>>>>websocketCtrl>>>>>>>>>>>>>>>>>', evt);
      setConnectedStatus(false);
    };

    websocketCtrl.onclose = function (evt) {
      if (window.devidceSockConnected) {
        console.log('Ctrl>>>>>>>>>>>>>>>close>>', evt);
        setWebsocketClosed();
      }
    };

    window.websocketData = new WebSocket(host, 'data');

    websocketData.onerror = function (evt) {
      setConnectedStatus(false);
    };

    websocketData.onopen = function (evt) {
      setConnectedStatus(true);
    };

    websocketData.onmessage = function (evt) {
      console.log('ws recieve message >>>>>', evt);
      if (evt && evt.data) {
        setDevideResultShow(evt.data);
      }
    };

    websocketData.onclose = function (evt) {
      if (window.devidceSockConnected) {
        console.log('Data>>>>>>>>>>>>>>>close>>', evt);
        setWebsocketClosed();
      }
      //
    };
  }

  setTimeout('open_connections()', 5000);
}

function setConnectedStatus(connected) {
  window.devidceSockConnected = !!connected;
  if (connected) {
    $('#deviceConnectStatus')
      .removeClass('has-text-danger')
      .addClass('has-text-success')
      .text('扫码设备已连接.');
  } else {
    $('#deviceConnectStatus')
      .removeClass('has-text-success')
      .addClass('has-text-danger')
      .text('扫码设备未连接.');
  }
}

function setWebsocketClosed() {
  window.devidceSockConnected = false;
  $('#deviceConnectStatus')
    .removeClass('has-text-success')
    .addClass('has-text-danger')
    .text('扫码设备已断开.');
}

/**
 *
 */
$(document).ready(function () {
  bindCloseModal();
  bindDeviceHelpBtn();
  // bind did-tab
  bindTabsSwitch();

  // bind light button
  bindLightSwitchTabs();

  if ($('#tabDevice').hasClass('is-active')) {
    open_connections();
  }
});
