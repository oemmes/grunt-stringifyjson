/*
 * grunt-stringifyjson
 *
 * Uses JSON.stringify to minify JSON files (i.e. removing whitespace)
 *
 * Copyright (c) 2014 Nils Heuermann
 * Licensed under the MIT license.
 */

'use strict' ;

module.exports = function(grunt) {

	grunt.registerMultiTask('stringifyjson', 'JSON.stringify wrapper for JSON files', function() {

		// Stringify and output
		this.files.forEach(function(file) {
			// Concat the files array
			var jsonString = file.src.filter(function(fileSrc) {
				if (!grunt.file.exists(fileSrc)) {
					grunt.log.warn('JSON source file "' + fileSrc + '" not found.') ;
					return false ;
				} else {
					return true ;
				}
			}).map(function(fileSrc) {
				grunt.verbose.writeln('Processing ' + fileSrc) ;
				var json = grunt.file.readJSON(fileSrc) ;
				return JSON.stringify(json) ;
			}).join(grunt.util.normalizelf(', ')) ;

			// write to the output file
			grunt.file.write(file.dest, jsonString) ;

			// user feedback
			grunt.verbose.writeln('Stringified "' + file.dest + '".') ;

		}) ;
	}) ;

} ;
