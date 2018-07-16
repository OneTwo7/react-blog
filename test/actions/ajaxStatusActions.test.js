import test from 'ava';
import * as ajaxStatusActions from '../../src/actions/ajaxStatusActions';
import * as types from '../../src/constants';

test('beginAjaxCall', t => {
  const expectedAction = {
    type: types.BEGIN_AJAX_CALL
  };

  const action = ajaxStatusActions.beginAjaxCall();

  t.deepEqual(action, expectedAction);
});

test('ajaxCallError', t => {
  const expectedAction = {
    type: types.AJAX_CALL_ERROR
  };

  const action = ajaxStatusActions.ajaxCallError();

  t.deepEqual(action, expectedAction);
});
