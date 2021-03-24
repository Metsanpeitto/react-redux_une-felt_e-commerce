import axios from "axios";

/**
- List Posts
- Create a Post
- Retrieve a Post
- Update a Post
- Delete a Post
 */

 /**  Let's simplify my life getting the render and displaying it finally as an innerhtml
  *   There is not need for complicated functions to fetch the element of each post. The
  *   variety among them can be large and become in a rabbit hole.
  */

const getPostList = async (data) => {
  //var url = `wp/v2/posts?per_page=100`;
  const { categoryId, page_to_request } = data;
  console.log(categoryId);
  console.log(page_to_request);
  var quantity = 5;
  var url = `wp/v2/posts?categories=${categoryId}&per_page=${quantity}&page=${page_to_request}`;

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

          /*
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
              const src = i.getAttribute("src");
              imgs.push(src);
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
              imgsN < 1 ? (imgsN = 1) : (imgsN = imgLength / 4);
              imgsN = Math.round(imgsN);
              var imgsOg = [];
              imgs.forEach((i) => {
                imgsOg.push(i);
              });
              var imgsGrouped = [];

              for (var i = 0; i < 4; i++) {
                imgsGrouped.push(imgsOg.slice(imgsN));
              }
              //console.log(imgsGrouped);
              if (imgsOg.length > 0) {
                const l = imgsOg.length;
                imgsGrouped[1].push(imgsOg.slice(l));
              }
              // console.log(imgsGrouped);

              /*  if (imgsN > 1) {
                imgsGrouped = chunk(imgsOg, imgsN);
              } else {
                imgs.forEach((i) => {
                  imgsGrouped.push(i);
                });
                //imgsGrouped = imgsOg.slice();
              }
            */

              // The received imgs must to be fetched in 4 layouts, Trying to
              // keep at least a picture for layout.
              //  In the case of odd number of pictures, they will divide by 4 an
              // placed in each layout. Then the rest will be stored in the last one
              // console.log(textLength);
              var textN = textLength / 4;
              textN < 1 ? (textN = 1) : (textN = textLength / 4);
              textN = Math.round(textN);

              var textOg = [];
              text.forEach((i) => {
                textOg.push(i);
              });
              var textGrouped = [];
              // console.log(textN);

              for (var i = 0; i < 4; i++) {
                textGrouped.push(textOg.slice(textN));
              }

              if (textOg.length > 0) {
                const l = textOg.length;
                textGrouped[1].push(textOg.slice(l));
              }
              //console.log(text);

              // console.log(textOg);
              //console.log(textGrouped);

              //  var textsGrouped = text;
              //  if (textN > 1) {
              //    textsGrouped = chunk(text, textN);
              // } else {
              //    textsGrouped = text;
              //  }

              for (var i = 0; i < 4; i++) {
                layouts[i] = {
                  srcs: imgsGrouped[i] ? imgsGrouped[i] : null,
                  texts: textGrouped[i] ? textGrouped[i] : null,
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

const chunk = (arr, size) => {
  arr.reduce(
    (acc, e, i) =>
      // i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
      i % size ? acc[acc.length - 1].push(e) : acc.push([e]),
    []
  );
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
  //const postId = data.postId;
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
