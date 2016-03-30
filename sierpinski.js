
function draw() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	return {
		sierpinski: sierpinski
	};

	function sierpinski() {
		var xOriginOffset = 10;
		var yOriginOffset = 530;

		canvas.width = 620;
		canvas.height = 540;
		var s = 600;
		var depth = 4;
		deriveTriangles(ctx, s, xOriginOffset, yOriginOffset, depth);
	}

	function deriveTriangles(ctx, s, xOriginOffset, yOriginOffset, depth) {
		if (depth > 0) {
			var baseCoords = _getPathCords(s, xOriginOffset, yOriginOffset);
			var innerCoords = deriveInnerTriangle(s, xOriginOffset, yOriginOffset);

			_drawTri(ctx, baseCoords.moveTo, baseCoords.firstPath, baseCoords.secondPath);
			_drawTri(ctx, innerCoords.moveTo, innerCoords.firstPath, innerCoords.secondPath, 'white');
			var top = innerCoords.moveTo;
			var bLeft = baseCoords.moveTo;
			var bRight = innerCoords.secondPath;

			[top, bLeft, bRight].forEach(function(coords) {
				var ic = deriveInnerTriangle(s / 2, coords[0], coords[1]);

				_drawTri(ctx, ic.moveTo, ic.firstPath, ic.secondPath, 'white');
			});
			var _depth = --depth ;

			deriveTriangles(ctx, s / 2, xOriginOffset + s / 2, yOriginOffset, _depth);
			deriveTriangles(ctx, s / 2, xOriginOffset, yOriginOffset, _depth);
			deriveTriangles(ctx, s / 2, top[0], top[1], _depth);
		}
	}

	//let p stand for arr of args for path to draw
	function _drawTri(ctx, p1, p2, p3, fillStyle) {
		ctx.beginPath();
		ctx.moveTo(p1[0], p1[1]);
		ctx.lineTo(p2[0], p2[1]);
		ctx.lineTo(p3[0], p3[1]);
		ctx.lineTo(p1[0], p1[1]);
		ctx.fillStyle = fillStyle ? fillStyle : 'black';
		ctx.fill();
	}

	//side-length of equilateral tri, offset x,y coords of canvas
	function _getPathCords(len, xOrigin, yOrigin) {
		var c = len;
		var b = c / 2;
		var a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
		return {
			moveTo: [xOrigin, yOrigin],
			firstPath: [c + xOrigin, yOrigin],
			secondPath: [b + xOrigin, yOrigin - a]
		};
	}

	function deriveInnerTriangle(len, xOrigin, yOrigin) {
		var s2 = len / 2;
		var c2 = s2;
		var b2 = c2 / 2;
		var a2 = Math.sqrt(Math.pow(c2, 2) - Math.pow(b2, 2));
		var xOrg2 = xOrigin + b2;
		var yOrg2 = yOrigin - a2;
		return {
			moveTo: [xOrg2, yOrg2],
			firstPath: [c2 + xOrg2, yOrg2],
			secondPath: [c2 + xOrigin, yOrigin]
		};
	}
}
