export function mount($node, $target) {
  $target.replaceWith($node);
  return $node;
};
