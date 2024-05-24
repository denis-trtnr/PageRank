function displayPageRank() {
    //Get the adjacency matrix of the active graph
    var M1 = getAdjMatrix();

    //Get damping_value and precision
    var damping_value = document.getElementById("damping_value").value;
    var precision_value = parseInt(document.getElementById("precision_value").value);

    var decimalOffset = Math.pow(10, precision_value);

    //Calculate the pagerank vector and round the results
    var r = M1.pagerank(damping_value);
    for (var i = 0; i < r.length; i++) {
        r[i] = Math.round(r[i] * decimalOffset) / decimalOffset;
    }

    // Combine nodes with their pageranks
    var nodesWithPagerank = [];
    for (var i = 0; i < nodes.length; i++) {
        nodesWithPagerank.push({ node: nodes[i], rank: r[i] });
    }

    // Sort nodes based on pagerank in descending order
    nodesWithPagerank.sort(function(a, b) {
        return b.rank - a.rank;
    });

    //Update the table with the new pageranks
    var pgTable = document.getElementById("pagerankTable");
    pgTable.innerHTML = "<tr><th>Node ID</th><th>PageRank</th></tr>";

    for (var i = 0; i < nodes.length; ++i) {
        var node = nodesWithPagerank[i].node;
        var rank = nodesWithPagerank[i].rank;

        var tdID = document.createElement("td");
        var textID = document.createTextNode(node.id);
        tdID.appendChild(textID);

        var tdRank = document.createElement("td");
        var textRank = document.createTextNode(rank);
        tdRank.appendChild(textRank);

        var trNode = document.createElement("tr");
        trNode.appendChild(tdID);
        trNode.appendChild(tdRank);

        pgTable.appendChild(trNode);
    }
}