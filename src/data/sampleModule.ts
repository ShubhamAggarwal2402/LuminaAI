export type ModuleData = {
  module_id: string
  title: string
  content_md: string
}

/** Sample module for demo. Replace with API fetch by module_id when backend is ready. */
export const SAMPLE_MODULE: ModuleData = {
  module_id: 'singly_linked_list',
  title: 'Singly Linked List',
  content_md: `## Singly Linked List

Singly linked lists are one of the most primitive data structures you will find in this book. Each node that makes up a singly linked list consists of a value, and a reference to the next node (if any) in the list.

### Insertion

In general when people talk about insertion with respect to linked lists of any form they implicitly refer to the adding of a node to the tail of the list. When you use an API like that of DSA and you see a general purpose method that adds a node to the list, you can assume that you are adding the node to the tail of the list not the head.

Adding a node to a singly linked list has only two cases:

1. head = ∅ in which case the node we are adding is now both the head and tail of the list; or
2. we simply need to append our node onto the end of the list updating the tail reference appropriately.

\`\`\`
algorithm Add(value)
Pre: value is the value to add to the list
Post: value has been placed at the tail of the list
n ← node(value)
if head = ∅
  head ← n
  tail ← n
else
  tail.Next ← n
  tail ← n
end if
end Add
\`\`\`

As an example of the previous algorithm consider adding the following sequence of integers to the list: 1, 45, 60, and 12.

### Searching

Searching a linked list is straightforward: we simply traverse the list checking the value we are looking for with the value of each node in the linked list.

\`\`\`
algorithm Contains(head, value)
Pre: head is the head node in the list
     value is the value to search for
Post: the item is either in the linked list, true; otherwise false
n ← head
while n ≠ ∅ and n.Value ≠ value
  n ← n.Next
end while
if n = ∅
  return false
end if
return true
end Contains
\`\`\`

### Deletion

Deleting a node from a linked list is straightforward but there are a few cases we need to account for:

1. the list is empty; or
2. the node to remove is the only node in the linked list; or
3. we are removing the head node; or
4. we are removing the tail node; or
5. the node to remove is somewhere in between the head and tail; or
6. the item to remove doesn't exist in the linked list

The algorithm whose cases we have described will remove a node from anywhere within a list irrespective of whether the node is the head etc. If you know that items will only ever be removed from the head or tail of the list then you can create much more concise algorithms. In the case of always removing from the front of the linked list deletion becomes an O(1) operation.

\`\`\`
algorithm Remove(head, value)
Pre: head is the head node in the list
     value is the value to remove from the list
Post: value is removed from the list, true; otherwise false
if head = ∅
  // case 1
  return false
end if
n ← head
if n.Value = value
  if head = tail
    // case 2
    head ← ∅
    tail ← ∅
  else
    // case 3
    head ← head.Next
  end if
  return true
end if
while n.Next ≠ ∅ and n.Next.Value ≠ value
  n ← n.Next
end while
if n.Next ≠ ∅
  if n.Next = tail
    // case 4
    tail ← n
  end if
  // this is only case 5 if the conditional on line 25 was false
  n.Next ← n.Next.Next
  return true
end if
// case 6
return false
end Remove
\`\`\`

### Traversing the List

Traversing a singly linked list is the same as that of traversing a doubly linked list. You start at the head of the list and continue until you come across a node that is ∅. The two cases are as follows:

1. node = ∅, we have exhausted all nodes in the linked list; or
2. we must update the node reference to be node.Next.

The algorithm described is a very simple one that makes use of a simple while loop to check the first case.

\`\`\`
algorithm Traverse(head)
Pre: head is the head node in the list
Post: the items in the list have been traversed
n ← head
while n ≠ 0
  yield n.Value
  n ← n.Next
end while
end Traverse
\`\`\`

### Traversing the List in Reverse Order

Traversing a singly linked list in a forward manner (i.e. left to right) is simple. However, what if we wanted to traverse the nodes in the linked list in reverse order for some reason? The algorithm to perform such a traversal is very simple, and just like demonstrated in the deletion section we will need to acquire a reference to the predecessor of a node, even though the fundamental characteristics of the nodes that make up a singly linked list make this an expensive operation. For each node, finding its predecessor is an O(n) operation, so over the course of traversing the whole list backwards the cost becomes O(n²).

\`\`\`
algorithm ReverseTraversal(head, tail)
Pre: head and tail belong to the same list
Post: the items in the list have been traversed in reverse order
if tail ≠ ∅
  curr ← tail
  while curr ≠ head
    prev ← head
    while prev.Next ≠ curr
      prev ← prev.Next
    end while
    yield curr.Value
    curr ← prev
  end while
  yield curr.Value
end if
end ReverseTraversal
\`\`\``,
}
