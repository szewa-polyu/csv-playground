/**
 * Return if the input object is a function
 * @method isFunction
 * @param {object} obj
 * @return {boolean} indicating if obj is a function
 */
const isFunction = obj => {
  return typeof obj === 'function';
};

const invokeIfIsFunction = obj => {
  if (isFunction(obj)) {
    if (arguments.length > 1) {
      const argumentsArray = Array.prototype.slice.call(arguments);
      const argumentsForFunc = argumentsArray.slice(1);
      return obj(...argumentsForFunc);
    } else {
      return obj();
    }
  } else {
    return null;
  }
};

const invokeAsyncIfIsFunction = async obj => {
  if (isFunction(obj)) {
    if (arguments.length > 1) {
      const argumentsArray = Array.prototype.slice.call(arguments);
      const argumentsForFunc = argumentsArray.slice(1);
      return await obj(...argumentsForFunc);
    } else {
      return await obj();
    }
  } else {
    return null;
  }
};

module.exports = { isFunction, invokeIfIsFunction, invokeAsyncIfIsFunction };
