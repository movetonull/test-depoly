$(function () {
  fillForm();

  $('input, textarea').change(function () {
    saveFieldValue($(this));
  });
});

function saveFieldValue(field) {
  if (localStorage) {
    if (field.prop('type') == 'radio') {
      var id = field.prop('id'),
        prefix = id.match(/^(record_notify_at)/);
      if (prefix && prefix.length > 1) {
        for (var i = 0, len = localStorage.length; i < len; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf(prefix[1]) >= 0) {
            try {
              localStorage.removeItem(key);
              i--;
            } catch (e) {
              console.log('Unable to remove localStorage key ' + key);
            }
          }
        }
      }

      localStorage[field.prop('id')] = !!field.prop('checked');
    } else if (field.prop('type') == 'text') {
      localStorage[field.prop('id')] = field.prop('value');
    } else if (field.prop('tagName').toLowerCase() == 'textarea') {
      localStorage[field.prop('id')] = field.val();
    } else if (field.prop('type') == 'checkbox') {
      localStorage[field.prop('id')] = !!field.prop('checked');
    }
  }
}

function fillForm() {
  if (localStorage){
    $('input, textarea').each(function(k, v) {
      var $v = $(v);

      if (localStorage[$v.prop('id')] !== null) {
        if ($v.prop('type') === 'radio') {
          if (localStorage[$v.prop('id')] === 'true') {
            $v.prop('checked', true).trigger('change', { currentTarget: v});
          }
        } else if ($v.prop('type') === 'text' || $v.prop("tagName").toLowerCase() == 'textarea') {
          $v.prop('value', localStorage[$v.prop('id')]);
          if ($v.val()){
            $v.trigger('change', { currentTarget: v});
          }
        } else if ($v.prop('type') === 'checkbox') {
          if (localStorage[$v.prop('id')] === 'true') {
            $v.prop('checked', true).trigger('change', { currentTarget: v});
          } else {
            $v.prop('checked', false).trigger('change', { currentTarget: v});
          }
        }
      }
    });
  }
}