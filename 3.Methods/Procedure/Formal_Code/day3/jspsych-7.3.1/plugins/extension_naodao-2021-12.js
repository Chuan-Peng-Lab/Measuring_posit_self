'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Naodao = function (jspsych) {
  'use strict';
  /**
   * **NaodaoExtension*
   * Control subjects to submit data
   * @author zntalk
   */

  var NaodaoExtension = function () {
    function NaodaoExtension(jsPsych) {
      _classCallCheck(this, NaodaoExtension);

      this.jsPsych = jsPsych;
      // !
      this.__preUrl = 'https://www.naodao.com/';
      this.__token = '';
      this.__id = '';
      this.__location = '';
      this.__itemId = '';
      this.__beginDate = '';
      this.__VIP = this.getQueryString('__vip_distribute_id') || null;
      // !
      this.__channel = '';
      this.__intervalId = '';
      this.__pollingIntervalTime = 2000;
      this.__startTime = '';
      this.__pollingTime = 1000 * 60 * 2;
      this.__pollingNumber = 3;
    }

    _createClass(NaodaoExtension, [{
      key: 'initialize',
      value: function initialize() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.__beginDate = _this.getQueryString('__beginDate');
          _this.__token = _this.getQueryString('__token');
          _this.__id = _this.getQueryString('__id');
          _this.__itemId = _this.getQueryString('__itemId');
          _this.__channel = _this.getQueryString('__channel');
          _this.__location = window.location.href;
          window.addEventListener('beforeunload', _this.beforeunload);
          window.addEventListener('unload', _this.unload);
          if (_this.__token === 'preview') {
            resolve();
            return;
          }
          if (_this.__location.includes('file://')) {
            resolve();
            return;
          }
          // !
          axios.post(_this.__preUrl + 'api/user/canvasNode/insertRecord', {
            nodeId: _this.__id,
            recordId: _this.__token,
            itemId: _this.__itemId,
            beginDate: _this.__beginDate ? _this.__beginDate : ''
          }).then(function (_ref) {
            var data = _ref.data;

            if (data.code === 200) {
              if (data.data) {
                resolve();
              } else {
                window.removeEventListener('beforeunload', _this.beforeunload);
                window.removeEventListener('unload', _this.unload);
                // !
                _this.showDialog('你的试验次数已用完，请联系研究者或平台管理员', function () {
                  _this.onErrorHandle('你的试验次数已用完，请联系研究者或平台管理员');
                });
                resolve();
              }
            } else {
              _this.onErrorHandle(data.desc);
              resolve();
            }
          }).catch(function () {
            _this.onErrorHandle();
            resolve();
          });
        });
      }
    }, {
      key: 'on_start',
      value: function on_start() {}
    }, {
      key: 'on_load',
      value: function on_load() {}
    }, {
      key: 'on_finish',
      value: function on_finish() {
        if (this.__token === 'preview' && this.__VIP) {
          this.uploadData(1);
          return;
        }
        if (this.__token === 'preview' || this.__location.includes('file://')) {
          this.jsPsych.data.get().localSave('csv', +new Date() + '.csv');
          return;
        }

        this.uploadData(1);
        // !
        this.__startTime = new Date().getTime();
        this.startPolling();
      }
    }, {
      key: 'beforeunload',
      value: function beforeunload(event) {
        event.preventDefault();
        event.returnValue = '';
      }
    }, {
      key: 'unload',
      value: function unload() {
        this.uploadData(0);
      }
    }, {
      key: 'getQueryString',
      value: function getQueryString(params) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (pair[0] == params) {
            return decodeURIComponent(pair[1]);
          }
        }
        return '';
      }
    }, {
      key: 'startPolling',
      value: function startPolling() {
        var _this2 = this;

        this.__intervalId = setInterval(function () {
          _this2.isDone();
        }, this.__pollingIntervalTime);
      }
    }, {
      key: 'isDone',
      value: function isDone() {
        var _this3 = this;

        var endTime = new Date().getTime();
        var isOvertime = endTime - this.__startTime > this.__pollingTime;
        axios.post(this.__preUrl + 'api/user/canvasNode/validation', {
          nodeId: this.__id,
          recordId: this.__token
        }).then(function (_ref2) {
          var data = _ref2.data;

          if (data.code === 200) {
            var _data$data = data.data,
                score = _data$data.score,
                state = _data$data.state,
                py = _data$data.py;

            var isNext = true;
            if (py) {
              isNext = score;
            }
            isOvertime && (isNext = true);
            if (isNext && state) {
              clearInterval(_this3.__intervalId);
              setTimeout(function () {
                _this3.showDialog('感谢您的耐心等待，继续下一步？', function () {
                  _this3.onSuccessHandle(data.code);
                });
              }, 2000);
            } else {
              if (isOvertime && _this3.__pollingNumber > 0) {
                clearInterval(_this3.__intervalId);
                _this3.showDialog('实验结果上传失败，请重试', function () {
                  --_this3.__pollingNumber;
                  _this3.__startTime = new Date().getTime();
                  _this3.startPolling();
                });
              }
              if (_this3.__pollingNumber === 0) {
                _this3.onErrorHandle('实验数据发生错误，请联系项目发布者或平台管理员，错误代码203');
              }
            }
          } else {
            _this3.showDialog(data.desc, function () {
              _this3.onErrorHandle(data.desc);
            });
          }
        });
      }
    }, {
      key: 'uploadData',
      value: function uploadData(state) {
        var _this4 = this;

        this.showDialog('实验上传中，请等待......');
        var data = this.jsPsych.data.get().csv();
        var baseUrl = this.__VIP ? 'api/user/jsPsych/resultsVip' : 'api/user/jsPsych/results';
        var tokenTemp = this.__VIP ? this.__VIP : this.__token;
        axios.post(this.__preUrl + baseUrl, {
          experimentId: this.__id,
          token: tokenTemp,
          key: this.__id,
          value: data,
          state: state
        }).then(function (_ref3) {
          var data = _ref3.data;

          if (data.code === 200) {
            window.removeEventListener('beforeunload', _this4.beforeunload);
            window.removeEventListener('unload', _this4.unload);
            document.querySelector('body').innerHTML = "<p class='jspsych-content'>您已完成本测试，窗口将在5秒后关闭</p>";
            setTimeout(function () {
              _this4.onSuccessHandle(data.code);
            }, 5000);
          } else {
            _this4.showDialog('数据上传失败，请重试', function () {
              _this4.uploadData(1);
            });
          }
        });
      }
    }, {
      key: 'showDialog',
      value: function showDialog(data, callback) {
        var existedDialogDOM = document.getElementById('dialog');
        if (existedDialogDOM) existedDialogDOM.parentNode.removeChild(existedDialogDOM);
        var isShowConfirmBtn = typeof callback === 'function';
        var alert_bg = document.createElement('div'),
            alert_box = document.createElement('div'),
            alert_text = document.createElement('div'),
            alert_btn = document.createElement('div'),
            textNode = document.createTextNode(data ? data : ''),
            btnText = document.createTextNode('确 定');
        alert_bg.setAttribute('id', 'dialog');
        this.initDialogCss(alert_bg, {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          // 'background-color': 'rgba(0, 0, 0, 0.1)',
          'background-color': '#e5e5e5',
          'z-index': '999999999'
        });

        this.initDialogCss(alert_box, {
          width: '270px',
          'max-width': '90%',
          'font-size': '16px',
          'text-align': 'center',
          'background-color': '#fff',
          'border-radius': '15px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        });

        this.initDialogCss(alert_text, {
          padding: '20px 15px',
          'border-bottom': '1px solid #ddd'
        });

        isShowConfirmBtn && this.initDialogCss(alert_btn, {
          padding: '10px 0',
          color: '#007aff',
          'font-weight': '600',
          cursor: 'pointer'
        });

        alert_text.appendChild(textNode);
        alert_box.appendChild(alert_text);
        alert_bg.appendChild(alert_box);
        if (isShowConfirmBtn) {
          alert_btn.appendChild(btnText);
          alert_box.appendChild(alert_btn);
        }
        document.getElementsByTagName('body')[0].appendChild(alert_bg);
        alert_btn.onclick = function () {
          if (typeof callback === 'function') {
            callback(); //回调
          }
          alert_bg.parentNode.removeChild(alert_bg);
        };
      }
    }, {
      key: 'initDialogCss',
      value: function initDialogCss(targetObj, cssObj) {
        var str = targetObj.getAttribute('style') ? targetObj.getAttribute('style') : '';
        for (var i in cssObj) {
          str += i + ':' + cssObj[i] + ';';
        }
        targetObj.style.cssText = str;
      }
    }, {
      key: 'onErrorHandle',
      value: function onErrorHandle(msg) {
        window.parent.postMessage({
          recordId: this.__token,
          nodeId: this.__id,
          isCompleted: false,
          code: 500,
          msg: msg
        }, '*');
      }
    }, {
      key: 'onSuccessHandle',
      value: function onSuccessHandle(code) {
        window.parent.postMessage({
          recordId: this.__token,
          nodeId: this.__id,
          isCompleted: true,
          code: code
        }, '*');
      }
    }]);

    return NaodaoExtension;
  }();

  NaodaoExtension.info = {
    name: 'naodao'
  };
  return NaodaoExtension;
}(jsPsychModule);
