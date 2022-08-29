import React from "react";
import { useStore } from "../utils/store";

// let originalConsoleError;

export function ErrorLog(gl) {
	const { setError } = useStore();
	// originalConsoleError = console.error.bind(gl);
  
	console.error = function (
		summary,
		getError,
		programParamCode,
		programParam,
		programLogExample,
		programLog,
		vertexErrors,
		fragmentErrors
	) {
		interceptConsoleError(summary, setError);
	};
}

function interceptConsoleError(log, errorLog) {
	if (!log) {
		console.warn("No WebGL content.");
		return;
	}
	let details, error, i, lines, message, shader, _i, _len;
	lines = log.split("\n");
	// filters out THREE.js handled errors in the raw log

	for (_i = 0, _len = lines.length; _i < _len; _i++) {
		i = lines[_i];
		if (i.substr(0, 16) === "Program Info Log") {
			if (lines[_i + 1]) {
				if (lines[_i + 1] === "VERTEX") {
					shader = "VERTEX";
				} else if (lines[_i + 1] === "FRAGMENT") {
					shader = "FRAGMENT";
				} else {
					// alert("Error: unable to parse shader type.");
				}
			} else {
				if (lines[_i + 2] === "VERTEX") {
					shader = "VERTEX";
				} else if (lines[_i + 2] === "FRAGMENT") {
					shader = "FRAGMENT";
				} else {
					// alert("Error: unable to parse shader type.");
				}
			}
		}

		if (i.substr(0, 5) === "ERROR") {
			error = i;
		}
	}
	if (!error || error[0] === "") {
		console.log("Unable to parse error.");
	}
	details = error.split(":");
	if (details.length < 4) {
		console.log("Unable to parse error. (less than 4)");
	}
	details[2] = parseInt(details[2]) - 59 - 68 * (shader === "VERTEX" ? 0 : 1);
	message = details.splice(0).join(":");

	let e = {
    	run:      false,
		shader:   shader,
		error:    message,
	};

	errorLog(e);
}
