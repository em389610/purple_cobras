"use strict";

function test(){

//********************************* TEST PROPERTIES *********************************
    this.dataStructure;				//Data Structure being visualized. NOTE: This is an object NOT a string
    this.dataStructureName = "";    //NOTE: This is a string containing the name of the structure
    this.canvasLocation = "";   	//Location in HTML file to display visualization
    this.locationWidth = null;  	//Width of the location ^
    this.locationHeight = null; 	//Height of the location ^^
    this.canvas;

//********************************* SUB-OBJECT ARRAY *********************************
    function array(){
        //********************************* ARRAY PROPERTIES *********************************
        this.data = [];			//The array to be visualized
        this.indexWidth = null;		//Width of each index visually
        this.indexHeight = null;    //Height of each index visually

        //********************************* ARRAY FUNCTIONS *********************************
        //Stores the passed array (A) as the data for the object
        this.data = function(A){
            this.data = A.slice(0, A.length);		//DEEP COPY THE ARRAY
        }

        //Stores the passed value (number) as the width of each index
        this.setIndexWidth = function(number){
            this.indexWidth = number;
        }

        //Stores the passed value (number) as the height of each index
        this.setIndexHeight = function(number){
            this.indexHeight = number;
        }
    } //End of Array Object



    function speed(){

        var width = $("body").width();
        var height = $("body").height();
        console.log("in speed constructor" + width + " " + height);

        var pos = [{"x":100,"y":20}, {"x":200,"y":20},{"x":300,"y":20}];
        pos[0].x = width / 6; pos[1].x = width / 3; pos[2].x = width / 2;

        this.data  = pos;
        this.pos0 = []; this.pos0.push(pos[0]);
        this.pos1 = []; this.pos1.push(pos[1]);
        this.pos2 = []; this.pos2.push(pos[2]);
        this.speed0 = 0;
        this.speed1 = 0;
        this.speed2 = 0;
        this.length = 1;

        this.data = function(pos) {
            this.data = pos;

        }

    }


//********************************* TEST FUNCTIONS *********************************
    //Function to determine what data structure is to be visualized
    //Contains some error checking to make sure the developer can find their mistake easier
    this.structure = function(structure){
        try{
            if(structure == "array" || structure == "Array"){
                this.dataStructure = new array();				//Makes this.dataStructure an array object
                this.dataStructureName = "array";				//This will be used in the visualize() function
                return this;
            } else if (structure == "speed") {
                this.dataStructure = new speed();
                this.dataStructureName = "speed";
                return this;
            }
            else{
                throw "Entered a structure not currently supported."		//Developer entered something not supported by the API
            }
        }

        catch(err){
            console.log(err)
        }
    }

    //Function to store the input data
    this.data = function(x){
        this.dataStructure.data = x.slice(0, x.length);		//The extra .data is an ARRAY OBJECT PROPERTY because this.dataStructure is an ARRAY OBJECT itself.
        return this;
    }

    //Function to store the location + locationHeight + locationWidth in HTML file
    this.location = function(node){
        this.canvasLocation = node;
        this.locationWidth = $(node).width();	//Calculates the width of the specified location
        this.locationHeight = $(node).height(); //Calculates the height of the specified location
        console.log("in location 1)size of canvas: " + this.locationWidth + " " + this.locationHeight);
        return this;
    }

    //Function to update the visualization based on new data
    this.update = function(_data){
        if (this.dataStructureName == "array") {
            var temp = false;
            temp = arraysEqual(_data, this.dataStructure.data);		//Determine if the old data == new data

            if(temp){
                				//Data was the same so do nothing
                				;
            }

                  else{
                				this.data(_data);							//Store the new data into the API object
                				this.canvas.selectAll("rect").remove();		//Removes the old SVG rectangles
                				this.canvas.selectAll("text").remove();		//Removes the old data from the screen
                				d3.select("#canvasID").remove();			//Delete the canvas
                				this.visualize();							//visualizes the updated structure

            }
        } else if (this.dataStructureName == "speed") {
            this.data = _data;

            this.canvas.selectAll("path").remove();
            this.canvas.selectAll("g").remove();
            d3.select("#canvasID").remove();
            this.visualize();

        }

    }

    //Function to construct the visualization
    this.visualize = function(){

        this.canvas = d3.select(this.canvasLocation)		//Finds the specified location of the HTML file and appends a "canvas" to it
            .append("svg")
            .attr("id", "canvasID")
            .attr("width", this.locationWidth)
            .attr("height", this.locationHeight);

        console.log("in visualize 2) size of canvas: " + this.locationWidth + " " + this.locationHeight);

        //***************************************************VISUALIZES AN ARRAY. MORE STRUCTURES CAN/SHOULD BE ADDED TO THIS FUNCTION***************************************************
        if(this.dataStructureName == "array"){
            if(this.locationWidth / this.dataStructure.data.length > 100){
				this.dataStructure.setIndexWidth(100);
				this.dataStructure.setIndexHeight(100);
			}
			else{
				this.dataStructure.setIndexWidth( this.locationWidth / this.dataStructure.data.length );
				this.dataStructure.setIndexHeight( this.locationWidth / this.dataStructure.data.length );
            
			}
			
			this.canvas.attr("height", this.dataStructure.indexHeight + 8 );

            for(var i = 0; i < this.dataStructure.data.length; ++i){
                this.canvas.selectAll("svg")
                    .data([1])
                    .enter()
                    .append("rect")
                    .attr("width", this.dataStructure.indexWidth)
                    .attr("height", this.dataStructure.indexHeight)
                    .attr("y", 2) //"centers" the rectangles vertically
                    .attr("x", i * this.dataStructure.indexWidth)
                    .attr("fill", "white")
                    .attr("class", "shape")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");

                this.canvas.selectAll("svg")
                    .data([1])
                    .enter()
                    .append("text")
                    .text(this.dataStructure.data[i])
                    .attr("class", "wrap")
					.attr("id", "rectWrap" + i)
                    .attr("y", 2)
                    .attr("x", i * this.dataStructure.indexWidth)
                     .attr("text-anchor", "middle");
            }//end of for loop

            for(var j = 0; j < this.dataStructure.data.length; ++j){
                //USE D3PLUS TO OVERLAP THE DATA WITH THE CORRECT ARRAY INDEX
                d3plus.textwrap()
                    .container(d3.select("#rectWrap" + j)) //Selects the ID of each SVG text object of the array and overlaps the text with the shape
                    .resize(true)  //Automatically resizes the text to fit the shape
                    .draw();
            }

        } //End of  if dataStructure == array
        else if (this.dataStructureName == "speed") {

            this.canvas.attr("height", this.locationWidth);
            this.locationHeight = this.locationWidth;
            console.log("in visualize: 3) size of canvas: " + this.locationWidth + " " + this.locationHeight);


            //console.log("size of data: " + this.dataStructure.data.length);
            //This is the accessor function we talked about above
            var lineFunction = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate("linear");

            ////////////////////////////////////////////////
            var x = d3.scale.linear()
                .range([0, this.locationWidth]);

            var y = d3.scale.linear()
                .range([0, this.locationHeight]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            //x.domain(d3.extent(this.dataStructure.data, function(d) {
            //    return d.x;
            //}));
            //y.domain(d3.extent(this.dataStructure.data, function(d) {
            //    return d.y;
            //}));

            x.domain(d3.extent(this.locationWidth));
            y.domain(d3.extent(this.locationHeight));


            ////////////////////////////////
            this.dataStructure.pos0.push(this.dataStructure.data[0]);
            this.dataStructure.pos1.push(this.dataStructure.data[1]);
            this.dataStructure.pos2.push(this.dataStructure.data[2]);
            this.dataStructure.length = this.dataStructure.pos0.length;
            var len = this.dataStructure.length;
            if (this.dataStructure.length > 1) {
                console.log("set speed..." + this.dataStructure.length + " " + len + " size of pos0 " + this.dataStructure.pos0.length);
                console.log("pos0 y1 y2 " + (this.dataStructure.pos0[len - 1]).y + " " + (this.dataStructure.pos0[len - 2]).y);
                this.dataStructure.speed0 = (this.dataStructure.pos0[len - 1]).y - (this.dataStructure.pos0[len - 2]).y;
                this.dataStructure.speed1 = this.dataStructure.pos1[this.dataStructure.length - 1].y - this.dataStructure.pos1[this.dataStructure.length - 2].y;
                this.dataStructure.speed2 = this.dataStructure.pos2[this.dataStructure.length - 1].y - this.dataStructure.pos2[this.dataStructure.length - 2].y;
            }
            ////////////////////////////////
            console.log("this.dataStructure.pos1 " + this.dataStructure.pos1[this.dataStructure.length - 1].x +
                " " + this.dataStructure.pos1[this.dataStructure.length - 1].y);
            console.log("this.dataStructure.speed0 " + this.dataStructure.speed0);

            //The line SVG Path we draw
            var graph = this.canvas;
            graph.append("g")
                 .attr("transform", "translate(" + 20 + "," + 20 + ")");

            graph.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.locationHeight - 20 + ")")
                .call(xAxis);

            graph.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            graph.append("path")
                .attr("d", lineFunction(this.dataStructure.pos0))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none");

            graph.append("path")
                .attr("d", lineFunction(this.dataStructure.pos1))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none");

            graph.append("path")
                .attr("d", lineFunction(this.dataStructure.pos2))
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none");


            //graph.append("text")
            //    .text(this.dataStructure.speed0)
            //    .attr("class", "wrap")
            //    .attr("y", 50)
            //    .attr("x", 900)
            //    //.attr("id", "rectWrap" + i)
            //    .attr("text-anchor", "middle");


        }
    } //End of visualize function


} //End of Test Object

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

