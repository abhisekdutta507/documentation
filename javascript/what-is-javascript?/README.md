### What is JavaScript?

JavaScript is a high-level and widely used `Programming Language`. It was developed by [Brendan Eich](https://brendaneich.com/) in 1995. JavaScript was originally developed to add interactivity and dynamic features to web pages.

#### Name some platforms where we can run JavaScript?

  * Web browsers
  * Servers using <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">Node.js</a> & <a href="https://docs.deno.com/runtime/" target="_blank" rel="noopener noreferrer">Deno</a>.

That means, we can execute JavaScript on both client-side (browser) and server-side (Node.js).

#### Why is it so popular?

  * **Versatility:** JavaScript works both on the front-end (in browsers) and back-end (using Node.js).
  * **Easy to learn:** Most of the learning materials are available open-sourced. And the beginner-friendly syntax makes JavaScript easy for learners.
  * **Multiple ecosystem:** Multiple libraries and frameworks like React.js, Next.js, Angular, Vue, Ionic, Express.js and strong community support help developers to build & maintain applications for long run.

#### What are the disadvantages of JavaScript Programming Language?

The main disadvantages are as follows,

  * **Debugging challenges:** It is loosely typed in nature. Because of that while debugging an application it might be difficult to understand the data & it's type.
  * **Security risks:** Anyone can inspect the browsers to see the codebase. Which makes it vulnerable to attacks if not coded securely.
  * **Performance:** When compared to other Programming Languages like C, C++. It will be slower to execute.
  * **Browser inconsistencies:** Different browsers may interpret JavaScript differently. Which might restrict the developers to write code in such a way so that it is supported by older versions of browsers too.
  * **Single-threaded execution:** JavaScript runs on a Single Thread. That means it can run only one task at a time. For powerful operations we must utilize <a href="https://github.com/abhisekdutta507/documentation/tree/main/javascript/what-is-event-loop%3F#what-is-event-loop" target="_blank" rel="noopener noreferrer">Event Loop</a>, <a href="https://nodejs.org/api/worker_threads.html#worker-threads" target="_blank" rel="noopener noreferrer">Worker Threads</a> & <a href="https://nodejs.org/api/cluster.html#cluster" target="_blank" rel="noopener noreferrer">Cluster</a> properly.

#### Example snippet:

```js
function sum(a, b) {
  return a + b;
}

console.log(sum(8, 6)); // Output: 14
```

Demo application to show the usage of <a href="https://bitbucket.org/abhisekdutta507/nodejs-worker-threads-and-clusters/src/master/" target="_blank" rel="noopener noreferrer">Worker Threads & Cluster</a>.
