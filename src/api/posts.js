import axios from "axios";

/**
- List Posts
- Create a Post
- Retrieve a Post
- Update a Post
- Delete a Post
 */

const getPostList = async (amount) => {
  var url = `wp/v2/posts?per_page=100`;
  //var url = `wp/v2/posts`;

  return await axios
    .get(process.env.REACT_APP_WORDPRESS + `${url}`)
    .then((result) => {
      if (result.status === 200) {
        var data = result.request.response;
        Object.json1 = JSON.parse(data);
        var posts = Object.json1;
        var postsReady = [];
        posts.map((p) => {
          var render = p.content.rendered;
          var result = render.slice(1, -1);
          var str = p.title.rendered;
          var title = str.replace("&#8211;", ":");
          var categories = p.categories;
          var mySubString = render.substring(
            result.lastIndexOf("<figure>") + 1,
            result.lastIndexOf("</figure>")
          );

          // Process the categories here

          var el = document.createElement("html");
          el.innerHTML = mySubString;

          var img = el.getElementsByTagName("img")[0];
          if (img) {
            img = img.src;
            var imgs = [];
            var imgsEl = el.getElementsByTagName("img");
            Array.from(imgsEl).forEach((i) => {
              imgs.push(i.getAttribute("src"));
            });

            var text = [];
            var parrafsEl = el.getElementsByTagName("p");
            Array.from(parrafsEl).forEach((p) => {
              text.push(p.textContent);
            });
            var layouts = [];
            if (imgs && text) {
              var imgLength = imgs.length;
              var textLength = text.length;

              var imgsN = imgLength / 4;

              imgsN < 1 ? (imgsN = 1) : (imgsN = imgsN);
              imgsN = Math.round(imgsN);
              var textN = textLength / 4;
              textN < 1 ? (textN = 1) : (textN = textN);
              textN = Math.round(textN);

              var imgsGrouped = chunk(imgs, imgsN);

              var l = imgsGrouped.length;
              if (l == 3) {
                var imgs4 = imgsGrouped.pop();

                var arr1 = [];
                var arr2 = [];
                arr1.push(imgs4[0]);
                arr2.push(imgs4[1]);

                imgsGrouped.push(arr1);
                imgsGrouped.push(arr2);
              }
              var lastImgs = imgsGrouped;

              var textsGrouped = chunk(text, textN);
              for (var i = 0; i < 4; i++) {
                layouts[i] = {
                  srcs: imgsGrouped[i] ? imgsGrouped[i] : null,
                  texts: textsGrouped[i] ? textsGrouped[i] : null,
                };
              }
            }

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

const chunk = (arr, size) =>
  arr.reduce(
    (acc, e, i) => (
      i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
    ),
    []
  );

const getCategoryTree = async (allPosts) => {
  var root = `&parent=0`;
  var level = 1;

  return await getTheCategories(root, level, allPosts).then((res) => {
    if (res) {
      return res;
    } else return null;
  });
};

const getTheCategories = async (parent, level, allPosts) => {
  var url = `wp/v2/categories?hide_empty=false&per_page=100`;

  return await axios
    .get(process.env.REACT_APP_WORDPRESS + `${url}`)
    .then((result) => {
      if (result.status === 200) {
        var data = result.request.response;
        Object.json1 = JSON.parse(data);
        var items = Object.json1;
        var posts = {
          id: "posts",
          items: proccessCategories(items, allPosts),
        };
        items.push(posts);
        return items;
      } else return null;
    });
};

const proccessCategories = (categoryTree, allPosts) => {
  // Here the categories should be setup at the development stage
  const categories = categoryTree;
  //  These are for posts
  const about = categorySorter(categories, 2, allPosts);
  const exhibition = categorySorter(categories, 4, allPosts);
  const u_feltedwool = categorySorter(categories, 5, allPosts);
  const u_mag = categorySorter(categories, 6, allPosts);
  const u_tool = categorySorter(categories, 7, allPosts);
  const Uncategorized = categorySorter(categories, 1, allPosts);
  const workshop = categorySorter(categories, 8, allPosts);
  const u_case = categorySorter(categories, 3, allPosts);

  var posts = [
    { name: "about", items: about, id_post: 2 },
    { name: "exhibition", items: exhibition, id_post: 4 },
    { name: "u_feltedwool", items: u_feltedwool, id_post: 5 },
    { name: "u_mag", items: u_mag, id_post: 6 },
    { name: "u_tool", items: u_tool, id_post: 7 },
    { name: "Uncategorized", items: Uncategorized, id_post: 1 },
    { name: "workshop", items: workshop, id_post: 8 },
    { name: "u_case", items: u_case, id_post: 3 },
  ];
  var filteredPosts = [];

  posts.map((p) => {
    if (p.items) {
      if (p.items.length > 0) {
        filteredPosts.push(p);
      }
    }
  });

  if (filteredPosts.length == 0) {
    filteredPosts = null;
  }

  return filteredPosts;
};

const categorySorter = (categories, categoryId, posts) => {
  var items = [];
  //This looks for all the subcategories of pieces/sculptures(54),tools(64) or painting(75)
  if (posts) {
    if (posts.length > 1) {
      posts.map((p) => {
        if (p.categories.length > 1) {
          p.categories.map((c) => {
            if (c == categoryId) {
              items.push(p);
            }
          });
        } else {
          if (p.categories == categoryId) {
            items.push(p);
          }
        }
      });
      return items;
    } else return null;
  } else return null;
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
    .get(process.env.REACT_APP_WORDPRESS + `wp/v2/comments`)
    .then((result) => {
      if (result.status === 200) {
        if (result.data) {
          var commentsReady = [];
          result.data.map((comment) => {
            var render = comment.content.rendered;
            var result = render.slice(1, -1);

            var el = document.createElement("html");
            el.innerHTML = result;

            var parraf = el.getElementsByTagName("p")[0];

            if (parraf) {
              var text = [];
              var parrafsEl = el.getElementsByTagName("p");
              Array.from(parrafsEl).forEach((p) => {
                text.push(p.textContent);
              });
            }

            var commentId = comment.id;
            var text = comment.content.rendered;
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
  const url = data.url;
  const comment = data.postComment;
  const postId = data.postId;
  return await axios
    // .post(process.env.REACT_APP_WORDPRESS + `wp/v2/comments/${id}`)
    .post(
      process.env.REACT_APP_WORDPRESS +
        `wp/v2/comments` +
        `?post=1&content=${comment}&author_name=${author}&author_email=${email}`
    )
    .then((result) => {
      if (result.status === 200) {
      } else {
        alert("error");
      }
    })
    .catch((e) => {
      // alert(e.response.data.message);
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
