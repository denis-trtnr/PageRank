# Interactive PageRank Demo 📊

Welcome to our interactive PageRank demo! This demo illustrates the concept of PageRank, a key algorithm used by search engines to rank web pages in their search results.

### What is PageRank? 🌐

PageRank is an algorithm used by Google Search to rank web pages in their search engine results. It works by counting the number and quality of links to a page to determine a rough estimate of the website's importance. The underlying assumption is that more important websites are likely to receive more links from other websites.

### Demo Overview 🖥️

- **Visualize a Graph**: Create am interactive visual representation of web pages and the links between them.
- **Adjust Damping Factor & Precision**: Experiment with factors influencing PageRank scores.
- **Run PageRank Algorithm**: Run the PageRank algorithm on the provided graph and observe the resulting rankings.

### Usage 🛠️

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Open the Demo**: Open the `index.html` file in your web browser.
3. **Interact**: Use the interactive graph to create nodes and analyze the PageRank.

### File Structure 📁

| File Name              | Description                                                                             |
|------------------------|-----------------------------------------------------------------------------------------|
| `pagerank.js`          | 🧠 Implements the PageRank algorithm logic, that calculates the PageRank scores for each node in the graph. |
| `vectors.js`           | 📐 Provides the foundational vector objects and operations required for the PageRank algorithm. |
| `visualizations.js`    | 👁️‍🗨️ Handles the visualization of the graph and the interactions with the user.        |
| `results.js`           | 🔄 Manages the updating of the result table with the latest PageRank scores.  |


### License 📝

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

### Credits 🙏

- [PageRank Explanation](https://www.youtube.com/watch?v=urKLHNhUEQ0)
- [Graph Visualization Script](http://bl.ocks.org/rkirsling/5001347)
- [Inspirations](https://github.com/nuric)
- [Matrix & Vector Library](http://sylvester.jcoglan.com)
