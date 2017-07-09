module.exports = class Foo {

  bar() {
    return !!this;
  }

  baz() {
    return !this.bar();
  }

};
