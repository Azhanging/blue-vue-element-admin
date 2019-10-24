import utils from 'blue-utils';

const ruleOpts = {
  required: true,
  trigger: ['blur', 'change']
};

export function genRules(opts = {}) {
  const {
    rule
  } = opts;
  const rules = utils.extend(ruleOpts, opts);
  if (rule instanceof RegExp) {
    rules.pattern = rule;
  } else if (typeof rule === 'function') {
    rules.validator = rule;
  }
  return [rules];
}

