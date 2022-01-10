import axios from "axios";

/**
- List Posts
- Create a Post
- Retrieve a Post
- Update a Post
- Delete a Post
 */

/**  Let's simplify my life getting the render and displaying it finally */

const getPostList = async (data) => {
  //var url = `wp/v2/posts?per_page=100`;
  const { categoryId, page_to } = data;

  var quantity = 4;
  var url = `wp/v2/posts?categories=${categoryId}&per_page=${quantity}&page=${page_to}`;

  return await axios
    .get(process.env.REACT_APP_WORDPRESS + `${url}`)
    .then((result) => {
      if (result.status === 200) {
        var data = result.request.response;
        Object.json1 = JSON.parse(data);
        var posts = Object.json1;
        var postsReady = [];
        posts.forEach((p) => {
          // console.log(p.content.rendered);
          var render = p.content.rendered;
          var result = render.slice(1, -1);
          var str = p.title.rendered;
          var title = str.replace("&#8211;", ":");
          var categories = p.categories;
          var mySubString = render.substring(
            result.lastIndexOf("<img") + 1,
            result.lastIndexOf(">")
          );

          // Process the categories here

          var el = document.createElement("html");
          el.innerHTML = mySubString;

          var imgArray = el.getElementsByTagName("img");
          var img = null;
          if (imgArray[0]) {
            img = imgArray[0].src;
            var layouts = [];
            var date = p.date;
            var dateArray = [];
            date.split(/\s*-\s*/).forEach(function (myString) {
              dateArray.push(myString);
            });

            var lastChunk = dateArray[2];
            var dayTime = lastChunk.split("T");

            var year = dateArray[0];
            var month = parseInt(dateArray[1]);
            var day = dayTime[0];
            var time = dayTime[1];
            var mL = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            var monthWord = mL[month - 1];
            var formattedDate = {
              year: year,
              month: month,
              day: day,
              time: time,
              monthWord: monthWord,
            };
            var postReady = {
              p,
              id_post: p.id,
              title: title,
              categories: categories,
              date: formattedDate,
              link: p.link,
              elements: result,
              thumbnail: img,
              layouts: layouts,
              render: render,
            };
            postsReady.push(postReady);
          }
        });
        return postsReady;
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      //alert(e.response);
    });
};

const getCategoryTree = async () => {
  return await getTheCategories().then((res) => {
    if (res) {
      return res;
    } else return null;
  });
};

const getTheCategories = async () => {
  var url = `wp/v2/categories?hide_empty=false&per_page=100`;

  return await axios
    .get(process.env.REACT_APP_WORDPRESS + `${url}`)
    .then((result) => {
      if (result.status === 200) {
        var data = result.request.response;
        Object.json1 = JSON.parse(data);
        var items = Object.json1;
        var curatedItems = [];
        items.forEach((i) => {
          var curatedItem = {
            count: i.count,
            description: i,
            id_post: i.id,
            link: i.link,
            meta: i.meta,
            name: i.name,
            parent: i.parent,
            slug: i.slug,
            taxonomy: i.taxonomy,
            links: i.links,
          };
          curatedItems.push(curatedItem);
        });

        return curatedItems;
      } else return null;
    });
};

const doPost = async () => {
  return await axios
    .post(process.env.REACT_APP_WORDPRESS + `wp/v2/posts`)
    .then((result) => {
      if (result.status === 200) {
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

const getPost = async (id) => {
  return await axios
    .get(process.env.REACT_APP_WORDPRESS + `wp/v2/posts/${id}`)
    .then((result) => {
      if (result.status === 200) {
        var data = result.request.response;
        Object.json1 = JSON.parse(data);
        var p = Object.json1;

        // console.log(p.content.rendered);
        var render = p.content.rendered;
        var result1 = render.slice(1, -1);
        var str = p.title.rendered;
        var title = str.replace("&#8211;", ":");
        var categories = p.categories;
        var mySubString = render.substring(
          result1.lastIndexOf("<img") + 1,
          result1.lastIndexOf(">")
        );

        // Process the categories here

        var el = document.createElement("html");
        el.innerHTML = mySubString;

        var imgArray = el.getElementsByTagName("img");
        var img = null;
        if (imgArray[0]) {
          img = imgArray[0].src;
          var layouts = [];
          var date = p.date;
          var dateArray = [];
          date.split(/\s*-\s*/).forEach(function (myString) {
            dateArray.push(myString);
          });

          var lastChunk = dateArray[2];
          var dayTime = lastChunk.split("T");

          var year = dateArray[0];
          var month = parseInt(dateArray[1]);
          var day = dayTime[0];
          var time = dayTime[1];
          var mL = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          var monthWord = mL[month - 1];
          var formattedDate = {
            year: year,
            month: month,
            day: day,
            time: time,
            monthWord: monthWord,
          };
          var postReady = {
            p,
            id_post: p.id,
            title: title,
            categories: categories,
            date: formattedDate,
            link: p.link,
            elements: result,
            thumbnail: img,
            layouts: layouts,
            render: render,
          };
          return postReady;
        } else {
          return null;
        }
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

const updatePost = async (id) => {
  return await axios
    .post(process.env.REACT_APP_WORDPRESS + `wp/v2/posts/${id}`)
    .then((result) => {
      if (result.status === 200) {
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

const deletePost = async (id) => {
  return await axios
    .delete(process.env.REACT_APP_WORDPRESS + `wp/v2/posts/${id}`)
    .then((result) => {
      if (result.status === 200) {
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

const getComments = async (id) => {
  return await axios
    .get(process.env.REACT_APP_WORDPRESS + `wp/v2/comments?post=${id}`)
    .then((result) => {
      if (result.status === 200) {
        if (result.data) {
          console.log(result.data);
          var commentsReady = [];
          result.data.forEach((comment) => {
            var render = comment.content.rendered;
            var result = render.slice(1, -1);

            var el = document.createElement("html");
            el.innerHTML = result;

            var parraf = el.getElementsByTagName("p")[0];
            var text = [];
            if (parraf) {
              var parrafsEl = el.getElementsByTagName("p");
              Array.from(parrafsEl).forEach((p) => {
                text.push(p.textContent);
              });
            }

            var commentId = comment.id;
            text = comment.content.rendered;
            var date = comment.date;
            var avatars = comment.author_avatar_urls;

            var commentReady = {
              commentId: commentId,
              text: text,
              date: date,
              avatars: avatars,
            };

            commentsReady.push(commentReady);
          });

          return commentsReady;
        }
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

/**
 *
 * https://www.example.com/wp-json/wp/v2/comments?author=Your%20Name%20Here
 * &author_email=your-email-address@website-address-here.com
 * &author_name=Your%20Name%20Here
 * &content=Your%20Comment%20Here
 * &post=1604252
 */

const createComment = async (data) => {
  //console.log(data);
  const email = data.email;
  const author = data.author;
  // const url = data.url;
  const comment = data.postComment;
  const postId = data.postId;
  console.log(data);
  return await axios
    // .post(process.env.REACT_APP_WORDPRESS + `wp/v2/comments/${id}`)
    .post(
      process.env.REACT_APP_WORDPRESS +
        `wp/v2/comments` +
        `?post=${postId}&content=${comment}&author_name=${author}&author_email=${email}`
    )
    .then((result) => {
      //  console.log(result);
      if (result.status === 200) {
      } else {
        //    console.log("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

const deleteComment = async (id) => {
  return await axios
    .post(process.env.REACT_APP_WORDPRESS + `wp/v2/comments/${id}`)
    .then((result) => {
      if (result.status === 200) {
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

export default {
  getPostList,
  doPost,
  getPost,
  updatePost,
  deletePost,
  getComments,
  createComment,
  deleteComment,
  getCategoryTree,
};
