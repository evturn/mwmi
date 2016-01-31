webpackHotUpdate(0,{

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _interopRequireDefault = __webpack_require__(24)['default'];\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _react = __webpack_require__(216);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(373);\n\nvar _moment = __webpack_require__(533);\n\nvar _moment2 = _interopRequireDefault(_moment);\n\nexports['default'] = function (_ref) {\n  var posts = _ref.posts;\n\n  return _react2['default'].createElement(\n    'div',\n    { className: 'posts' },\n    posts.results.map(function (post, i) {\n      return _react2['default'].createElement(\n        'div',\n        { key: i, className: 'post-item', 'data-ks-editable': 'if-user-blah-blah-blah' },\n        _react2['default'].createElement(\n          _reactRouter.Link,\n          { to: { pathname: '/blog/post/' + post.slug } },\n          post.title\n        ),\n        _react2['default'].createElement(\n          'div',\n          { className: 'post-item__caption' },\n          'By: ',\n          post.author.name.first,\n          ' | ',\n          (0, _moment2['default'])(post.publishedDate).format('MMM Do YY')\n        ),\n        _react2['default'].createElement('img', { className: 'post-item__image', src: post.image.url }),\n        _react2['default'].createElement('div', { className: 'post-item__body', dangerouslySetInnerHTML: { __html: post.content.extended } }),\n        _react2['default'].createElement(\n          'div',\n          { className: 'post-item__categories' },\n          'Posted in | ',\n          post.categories.map(function (category, i) {\n            return _react2['default'].createElement(\n              _reactRouter.Link,\n              { key: i, to: { pathname: '/blog/' + category.key } },\n              category.name\n            );\n          })\n        )\n      );\n    })\n  );\n};\n\nmodule.exports = exports['default'];//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vY29tbW9uL2NvbXBvbmVudHMvUG9zdHMuanM/MjQ0YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztpQ0FBa0IsR0FBTzs7Ozt1Q0FDSixHQUFjOztrQ0FDaEIsR0FBUTs7OztxQkFFWixVQUFDLElBQU8sRUFBSztNQUFYLEtBQUssR0FBTixJQUFPLENBQU4sS0FBSzs7QUFDcEIsU0FDRTs7TUFBSyxTQUFTLEVBQUMsT0FBTztJQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUMsRUFBSztBQUNyRCxhQUNFOztVQUFLLEdBQUcsRUFBRSxDQUFFLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxvQkFBaUIsd0JBQXdCO1FBQzFFOztZQUFNLEVBQUUsRUFBRyxFQUFDLFFBQVEsa0JBQWdCLElBQUksQ0FBQyxJQUFNLEVBQUc7VUFBRSxJQUFJLENBQUMsS0FBSztTQUFRO1FBQ3RFOztZQUFLLFNBQVMsRUFBQyxvQkFBb0I7O1VBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSzs7VUFBSyx5QkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUFPO1FBQ3pILDBDQUFLLFNBQVMsRUFBQyxrQkFBa0IsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFJLEdBQUc7UUFDekQsMENBQUssU0FBUyxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFHLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFHLEdBQUc7UUFDL0Y7O1lBQUssU0FBUyxFQUFDLHVCQUF1Qjs7VUFBYyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUs7QUFDdkYsbUJBQU87O2dCQUFNLEdBQUcsRUFBRSxDQUFFLEVBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxhQUFXLFFBQVEsQ0FBQyxHQUFLLEVBQUc7Y0FBRSxRQUFRLENBQUMsSUFBSTthQUFRLENBQUM7V0FDeEYsQ0FBQztTQUFPO09BQ0wsQ0FDTjtLQUNILENBQUM7R0FBTyxDQUNUO0NBQ0giLCJmaWxlIjoiNTE5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCAoe3Bvc3RzfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdHNcIj57cG9zdHMucmVzdWx0cy5tYXAoKHBvc3QsIGkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJwb3N0LWl0ZW1cIiBkYXRhLWtzLWVkaXRhYmxlPVwiaWYtdXNlci1ibGFoLWJsYWgtYmxhaFwiPlxuICAgICAgICAgIDxMaW5rIHRvPXsge3BhdGhuYW1lOiBgL2Jsb2cvcG9zdC8ke3Bvc3Quc2x1Z31gIH19Pntwb3N0LnRpdGxlfTwvTGluaz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3QtaXRlbV9fY2FwdGlvblwiPkJ5OiB7cG9zdC5hdXRob3IubmFtZS5maXJzdH0gfCB7bW9tZW50KHBvc3QucHVibGlzaGVkRGF0ZSkuZm9ybWF0KCdNTU0gRG8gWVknKX08L2Rpdj5cbiAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInBvc3QtaXRlbV9faW1hZ2VcIiBzcmM9e3Bvc3QuaW1hZ2UudXJsfSAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1pdGVtX19ib2R5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9eyB7X19odG1sOiBwb3N0LmNvbnRlbnQuZXh0ZW5kZWR9IH0gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3QtaXRlbV9fY2F0ZWdvcmllc1wiPlBvc3RlZCBpbiB8IHtwb3N0LmNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxMaW5rIGtleT17aX0gdG89e3sgcGF0aG5hbWU6IGAvYmxvZy8ke2NhdGVnb3J5LmtleX1gIH19PntjYXRlZ29yeS5uYW1lfTwvTGluaz47XG4gICAgICAgICAgfSl9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9KX08L2Rpdj5cbiAgKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9jb21tb24vY29tcG9uZW50cy9Qb3N0cy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }

})