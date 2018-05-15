import { MessageBox, Toast, Indicator } from 'mint-ui';

const tip = {};

tip.toast = (message, { position, iconClass, className, duration = 1e3 } = {}) => {
  Toast({
    message: '' + message,
    position,
    iconClass,
    className,
    duration
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
tip.info = (message, position, duration) => {
  return tip.toast(message, { position, duration });
};

tip.loading = (message = '请稍候...', { spinnerType } = {}) => {
  return Indicator.open({
    text: message,
    spinnerType
  });
};
tip.hideLoading = () => {
  return Indicator.close();
};

tip.message = (...args) => {
  return MessageBox.apply(null, args);
};
tip.alert = (message, isStatic) => {
  return tip.message({
    title: '提示',
    message: message,
    closeOnClickModal: !isStatic
  });
};
tip.confirm = (message, { title } = {}) => {
  return MessageBox.confirm(message, title);
};

export default tip;
