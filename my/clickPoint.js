var VSHADER_SOURCE='attribute vec4 a_Position;\n'+'attribute float a_PointSize;\n'+
'void main(){\n'+
'gl_Position=a_Position;\n'+
'gl_PointSize=a_PointSize;\n'+
'}\n';

var FSHADER_SOURCE='void main(){\n'+'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
'}\n';

function main(){
	var canvas=document.getElementById('webgl');
	var gl=getWebGLContext(canvas);
	if(!gl){
		return;
	}

	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		return;
	}

	var a_Position=gl.getAttribLocation(gl.program,'a_Position');
	if(a_Position<0){
		return;
	}

	var a_PointSize=gl.getAttribLocation(gl.program,'a_PointSize');
	if(a_PointSize<0){
		return;
	}
	gl.vertexAttrib1f(a_PointSize,20.0);


   canvas.onmousedown=function(ev){
   	click(ev,gl,canvas,a_Position);
   }



	gl.clearColor(0.0,0.0,0.0,1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points=[];
function click(ev,gl,canvas,a_Position){
    var x=ev.clientX;
    var y=ev.clientY;
    var rect=ev.target.getBoundingClientRect();

    x=((x-rect.left)-canvas.height/2)/(canvas.height/2);
    y=(canvas.width/2-(y-rect.top))/(canvas.width/2);

    g_points.push(x);g_points.push(y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len=g_points.length;
    for(var i=0;i<len;i+=2){
    gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);
    gl.drawArrays(gl.POINTS,0,1);}
}