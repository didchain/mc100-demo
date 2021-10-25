const SwitchBtnId = 'switchBtn'
window.devidceSockEnabled = false
function main($) {
  if (typeof $ === 'undefined' && typeof window.jQuery === 'undefined') {
    throw new Error('miss jquery')
  }

  window.commLoginEnable = true

  var ifrElctx = $('#commLoginCtx')
  var commCtx = $('#commLoginCtx')

  function checkSwitchState() {}

  function toggleMode() {
    if (commCtx.hasClass('did-hide')) {
      ifrElctx.addClass('did-hide')
      commCtx.removeClass('did-hide')
    } else {
      ifrElctx.removeClass('did-hide')
      commCtx.addClass('did-hide')
    }
  }

  $('#switchBtn').click(function (e) {
    console.log('>>>>>>>>>>>', e)
    toggleMode()
  })
}
