import Layer from '../../Layer';
import Tensor from '../../Tensor';
import ops from 'ndarray-ops';

/**
 * GlobalMaxPooling2D layer class
 */
export default class GlobalMaxPooling2D extends Layer {
  /**
   * Creates a GlobalMaxPooling2D layer
   */
  constructor(attrs = {}) {
    super(attrs);
    this.layerClass = 'GlobalMaxPooling2D';

    const { dimOrdering = 'tf' } = attrs;
    this.dimOrdering = dimOrdering;
  }

  /**
   * Method for layer computational logic
   * @param {Tensor} x
   * @returns {Tensor} x
   */
  call(x) {
    // convert to tf ordering
    if (this.dimOrdering === 'th') {
      x.tensor = x.tensor.transpose(1, 2, 0);
    }

    const channels = x.tensor.shape[2];
    let y = new Tensor([], [ channels ]);
    for (let i = 0, len = channels; i < len; i++) {
      y.tensor.set(i, ops.sup(x.tensor.pick(null, null, i)));
    }
    x.tensor = y.tensor;
    return x;
  }
}
