import server from '../server';
import devServer from './devServer';
import path from 'path';
import express from 'express';
import { init, send } from './middleware';
import * as blog from '../controllers/blog';
import * as post from '../controllers/post';
import * as contact from '../controllers/contact';

export default function(app) {
  if (process.env.NODE_ENV === 'development') {
    devServer(app);
  }

  app.use(init);

  app.get('/api/locals',          blog.loadCategories, blog.loadPosts, send);
  app.get('/api/blog/:category?', blog.currentCategoryFilter, blog.loadCategories, blog.loadPosts, send);
  app.get('/api/blog/post/:post', post.loadCurrentPost, post.loadOtherPosts, send);
  app.get('/api/contact',         contact.get, send);
  app.post('/api/contact',        contact.post, send);

  app.get('*', (req, res) => server(req, res));
};