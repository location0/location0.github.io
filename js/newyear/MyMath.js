const MyMath = (function MyMathFactory(Math) {
	const MyMath1 = {};

	// 一些常数
	MyMath1.toDeg = 180 / Math.PI;
	MyMath1.toRad = Math.PI / 180;
	MyMath1.halfPI = Math.PI / 2;
	MyMath1.twoPI = Math.PI * 2;

	// 使用两直角边的勾股定理
	MyMath1.dist = (width, height) => {
		return Math.sqrt(width * width + height * height);
	};
	
	//两点间距离
	MyMath1.pointDist = (x1, y1, x2, y2) => {
		const distX = x2 - x1;
		const distY = y2 - y1;
		return Math.sqrt(distX * distX + distY * distY);
	};
	
	// 与y轴负半轴夹角[-π,π)，弧度制
	MyMath1.angle = (width, height) => ( MyMath.halfPI + Math.atan2(height, width) );

	// Returns the angle (in radians) between two points
	// Same as above, but takes coordinates instead of dimensions.
	// 坐标版
	MyMath1.pointAngle = (x1, y1, x2, y2) => ( MyMath.halfPI + Math.atan2(y2 - y1, x2 - x1) );

	// 将速度矢量正交分解，单位为弧度制
	MyMath1.splitVector = (speed, angle) => ({
		x: Math.sin(angle) * speed,
		y: -Math.cos(angle) * speed
	});

	// 生成[min,max)之间的随机数
	MyMath1.random = (min, max) => Math.random() * (max - min) + min;
	
	// 生成[min,max)之间的随机整数
	MyMath1.randomInt = (min, max) => ((Math.random() * (max - min + 1)) | 0) + min;

	// Returns a random element from an array, or simply the set of provided arguments when called
	// 随机选择数组中元素
	MyMath1.randomChoice = function randomChoice(choices) {
		if (arguments.length === 1 && Array.isArray(choices)) {
			return choices[(Math.random() * choices.length) | 0];
		}
		return arguments[(Math.random() * arguments.length) | 0];
	};
	
	// Clamps a number between min and max values
	// 返回num,min,max中间大小的值(min<max)
	MyMath1.clamp = function clamp(num, min, max) {
		return Math.min(Math.max(num, min), max);
	};


	return MyMath1;

})(Math);

console.log(MyMath)