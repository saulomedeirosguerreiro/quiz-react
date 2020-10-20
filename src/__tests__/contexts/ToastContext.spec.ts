import { renderHook } from '@testing-library/react-hooks';
import { ToastProvider, useToast } from '../../context/ToastContext';

describe('Toast Context', () => {
  it('should be able to add toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.addToast({
      title: 'title of toast',
      type: 'error',
    });

    expect(result.current.messages[0].title).toEqual('title of toast');
  });

  it('should be able to remove all toasts', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.removeAllToast();

    expect(result.current.messages.length).toEqual(0);
  });
});
