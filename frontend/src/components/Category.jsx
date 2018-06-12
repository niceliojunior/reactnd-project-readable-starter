import React from 'react';
import ListPosts from './ListPosts';

export default function Category(props) {
  return (
    <div id="content">
      <ListPosts {...props} />
    </div>
  );
}