/**
 * Course outline shape returned by the API for a course's sidebar.
 */

export type CourseOutlineModule = {
  id: string
  name: string
}

export type CourseOutlineSection = {
  section_name: string
  modules: CourseOutlineModule[]
}

export type CourseOutline = {
  course: string
  sections: CourseOutlineSection[]
}

/** Data Structures & Algorithms course outline (API response shape). */
export const DATA_STRUCTURES_OUTLINE: CourseOutline = {
  course: 'Data Structures',
  sections: [
    {
      section_name: 'Linked Lists',
      modules: [
        { id: 'c7a49b63-b52d-45c7-9af8-fbfb92a3da29', name: 'Singly Linked List' },
        { id: 'ae5fee85-25c8-459c-ba80-274f25cc5059', name: 'Doubly Linked List' },
      ],
    },
    {
      section_name: 'Binary Search Tree',
      modules: [
        { id: '1891a0ff-3484-4e9e-80f2-3b86064f9243', name: 'Binary Search Tree' },
      ],
    },
    {
      section_name: 'Heap',
      modules: [
        { id: '1635cc8c-f770-4ef8-8198-e186aac8a5c5', name: 'Heap' },
      ],
    },
    {
      section_name: 'Sets',
      modules: [
        { id: '3b4197d2-9080-4249-ad9d-b3def28746e9', name: 'Unordered Sets' },
        { id: '80d9580d-1422-4f00-8d98-834796189d11', name: 'Ordered Sets' },
      ],
    },
    {
      section_name: 'Queues',
      modules: [
        { id: '877f066b-5797-410f-9107-8889c32e3afa', name: 'Standard Queue' },
        { id: '4803d053-6908-4097-8a5f-756f403f1b28', name: 'Priority Queue' },
        { id: 'b5bf2152-32b7-47ee-984b-de408a74e90b', name: 'Double Ended Queue' },
      ],
    },
    {
      section_name: 'AVL Tree',
      modules: [
        { id: '22597bb3-4315-4d0f-9baf-e820872c41ca', name: 'AVL Tree' },
      ],
    },
  ],
}
