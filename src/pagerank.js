function getAdjMatrix() {
    var resultM = [];

    //For every node
    for (var i = 0; i < nodes.length; ++i) {
        var row = [];
        //Check its links with other nodes
        for (var j = 0; j < nodes.length; ++j) {
            var isThereALink = false;
            for (var k = 0; k < links.length; ++k) {
                if ((links[k].source === nodes[i] && links[k].target === nodes[j] && links[k].right) ||
                    (links[k].source === nodes[j] && links[k].target === nodes[i] && links[k].left)) {
                    isThereALink = true;
                    break;
                }
            }
            if (isThereALink) {
                row.push(1);
            } else {
                row.push(0);
            }

        }
        resultM.push(row);
    }
    return $M(resultM);
}

Matrix.prototype.pagerank = function (damping_value) {
    // Prepares matrix by making each row sums  of to 1
    var row_stochastic_matrix = this.row_stochastic(damping_value);

    // Transposing matrix so it is not about outgoing but incoming links
    var transposed_matrix = row_stochastic_matrix.transpose();

    // Finding the correct Eigenvector and therefore the page rank
    var eigenvector = transposed_matrix.eigenvector();

    // Scaling the vector (r) so that its length becomes 1 while preserving its direction
    var normalized_eigenvector = eigenvector.normalize();

    // Returns the vector
    return normalized_eigenvector.elements;
}

Matrix.prototype.row_stochastic = function (damping_factor) {

    // row_length is set to the length of the first row of the matrix (assuming all rows have the same length)
    var row_length = this.elements[0].length;
    var d = (1 - damping_factor) / row_length;

    var row_total = [];

    //Sums up the outgoing links for each Node (row), so that we can later calculate probability
    for (var x = 0; x < row_length; x++) {
        row_total.push(0);
        for (y = 0; y < row_length; y++) {
            row_total[x] += this.elements[x][y];
        }
    }

    var a1 = this.elements;

    for (var x = 0; x < row_length; x++) {
        for (var y = 0; y < row_length; y++) {
            if (row_total[x] > 0) {
                /* 
                Normalize Matrix by dividing the element by the the total sum of outgoing connections (propability to click on link).
                Additionally the damping factor gets added to each element
                */
                a1[x][y] = a1[x][y] / row_total[x] + d;
            } else {
                /* If the sum of the row is 0 (meaning there are no outgoing links from that node), 
                it sets each element in that row to a value that distributes the damping factor evenly among all nodes
                */
                a1[x][y] = (1 / row_length) + d;
            }
        }
    }

    return $M(a1);
}

// scaling the vector (r) so that its length becomes 1 while preserving its direction
Vector.prototype.normalize = function () {

    var row_length = this.elements.length;
    var t = 0;

    for (var i = 0; i < row_length; i++) {
        t += this.elements[i];
    }

    return this.multiply((1.0 / t));
}

Matrix.prototype.eigenvector = function () {

    var tolerance = 0.000001;

    var row_length = this.elements[0].length;

    var a = [];

    for (var i = 0; i < row_length; i++) {
        a.push(1);
    }

    var x = $V(a);

    var c_old = 0;

    //Iterates a fixed number of times, since this is only a demo. 
    //You could let it run until convergence error goal is met
    for (var i = 0; i < 100; i++) {
        //Current vector is normalized to ensure its elements sum to 1
        var x_new = x.normalize()
        var c_new = x_new.elements[0];

        // Calculates the convergence error between current and old vector
        // If the convergence error is below the specified tolerance, the iteration loop breaks
        var e = 100 * (c_new - c_old) / c_new;
        if (Math.abs(e) < tolerance) {
            break;
        }

        x = this.multiply(x_new);
        c_old = c_new;
    }

    return $V(x);

}