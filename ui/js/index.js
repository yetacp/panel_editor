'use strict';

function openTab(evt, cityName) {
  var i;
  var x = document.getElementsByClassName('city');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  var activebtn = document.getElementsByClassName('testbtn');
  for (i = 0; i < x.length; i++) {
    activebtn[i].className = activebtn[i].className.replace(' w3-theme-dark', '');
  }
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' w3-theme-dark';
}

$(function () {
  var mybtn = $('.testbtn')[0];
  mybtn.click();

  $('.xline').on('click', function (evt) {
    console.log(evt.offsetX, evt.offsetY);
  });

  var node_select = function (evt, element) {
    console.log(element);
    if (element.node && element.node.data) {
      var data = element.node.data;
      $('#component_name').val(data.name);
      $('#component_text').val(data.text);
      $('#component_len').val(data.len);
    }
  }

  var create_screen = {
    'label': 'New screen',
    'icon': 'fa fa-desktop',
    'action': function (data) {
      var ref = $.jstree.reference(data.reference);
      var sel = ref.get_selected();
      if (!sel.length) {
        return false;
      }
      sel = sel[0];
      sel = ref.create_node(sel, {
        'type': 'screen',
        'text': 'New screen',
        'icon': 'fa fa-lg fa-desktop'
      });
      if (sel) {
        ref.edit(sel);
      }
    }
  };

  var create_group = {
    'label': 'New group',
    'icon': 'fa fa-object-group',
    'action': function (data) {
      var ref = $.jstree.reference(data.reference);
      var sel = ref.get_selected();
      if (!sel.length) {
        return false;
      }
      sel = sel[0];
      sel = ref.create_node(sel, {
        'type': 'group',
        'text': 'New group',
        'icon': 'fa fa-lg fa-object-group'
      });
      if (sel) {
        ref.edit(sel);
      }
    }
  };

  var create_field = {
    'label': 'New field',
    'icon': 'fa fa-sticky-note-o',
    'action': function (data) {
      var ref = $.jstree.reference(data.reference);
      var sel = ref.get_selected();
      if (!sel.length) {
        return false;
      }
      sel = sel[0];
      sel = ref.create_node(sel, {
        'type': 'field',
        'text': 'New field',
        'icon': 'fa fa-lg fa-sticky-note-o'
      });
      if (sel) {
        ref.edit(sel);
      }
    }
  }

  var create_label = {
    'label': 'New label',
    'icon': 'fa fa-font',
    'action': function (data) {
      var ref = $.jstree.reference(data.reference);
      var sel = ref.get_selected();
      if (!sel.length) {
        return false;
      }
      sel = sel[0];
      sel = ref.create_node(sel, {
        'type': 'label',
        'text': 'New label',
        'icon': 'fa fa-lg fa-font'
      });
      if (sel) {
        ref.edit(sel);
      }
    }
  }

  var node_rename = {
    'label': 'Rename',
    'icon': 'fa fa-edit',
    'action': function (data) {
      var ref = $.jstree.reference(data.reference);
      var obj = ref.get_node(data.reference);
      ref.edit(obj);
    },
    'separator_before': true,
    'separator_after': true
  }

  var node_delete = {
    'label': 'Delete',
    'icon': 'fa fa-remove',
    'action': function (data) {
      var ref = $.jstree.reference(data.reference);
      var sel = ref.get_selected();
      if (!sel.length) {
        return false;
      }
      ref.delete_node(sel);
    }
  }

  var context_menu = {
    'items': function (node) {
      if (node) {
        if (node.type === 'screen') {
          return {
            'create_group': create_group,
            'create_label': create_label,
            'create_field': create_field,
            'node_rename': node_rename,
            'node_delete': node_delete
          };
        } else if (node.type === 'group') {
          return {
            'create_group': create_group,
            'create_label': create_label,
            'create_field': create_field,
            'node_rename': node_rename,
            'node_delete': node_delete
          };
        } else if (node.type === 'field') {
          return {
            'node_rename': node_rename,
            'node_delete': node_delete
          };
        } else if (node.type === 'label') {
          return {
            'node_rename': node_rename,
            'node_delete': node_delete
          };
        } else if (node.type === 'root') {
          return {
            'create_screen': create_screen
          };
        }
      }
      return {};
    }
  }

  $('#jstree_demo').jstree({
    'contextmenu': context_menu,
    'core': {
      'animation': 0,
      'check_callback': true,
      'force_text': true,
      'themes': {
        'stripes': true
      },
      'data': {
        'url': function (node) {
          var time = Math.round((new Date()).getTime() / 1000);
          return '/api/root?t=' + time;
        },
        'data': function (node) {
          return {
            'id': node.id
          };
        }
      }
    },
    'plugins': ['contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow'],
    'types': {
      '#': {
        'max_children': 1,
        'max_depth': 5,
        'valid_children': ['root']
      },
      'root': {
        'icon': 'fa fa-lg fa-sitemap',
        'valid_children': ['screen']
      },
      'screen': {
        'valid_children': ['group', 'field', 'label']
      },
      'group': {
        'valid_children': ['group', 'field', 'label']
      },
      'field': {
        'icon': 'fa fa-lg fa-sticky-note-o',
        'valid_children': []
      },
      'label': {
        'icon': 'fa fa-lg fa-font',
        'valid_children': []
      }
    }
  });
  $('#jstree_demo').on('select_node.jstree', node_select);
})