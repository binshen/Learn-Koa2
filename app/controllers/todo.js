import Todo from '../services/todo';

const home = async (ctx, next) => {
  const user = ctx.session.user;
  if (!user) {
    return ctx.redirect('/');
  }
  const todos = Todo.getTodos(user.name);
  await ctx.render('todo/index', {
    todos,
    csrf: ctx.csrf,
    title: 'todos page',
    content: 'this is todo page'
  });
};

const addNew = (ctx, next) => {
  console.log(ctx.request);
  console.log('request body');
  console.log(ctx.request.body);
  ctx.body = 111;
}

const complete = async (ctx, next) => {

};

const delay = async (ctx, next) => {

};

const detailTodo = async (ctx, next) => {

};

const updateTodo = async (ctx, next) => {

};

const deleteTodo = async (ctx, next) => {

};

export default {
  home,
  delay,
  addNew,
  complete,
  detailTodo,
  updateTodo,
  deleteTodo
};
