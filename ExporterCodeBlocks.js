var Exporter = require('./Exporter.js');
var Files = require('./Files.js');
var Paths = require('./Paths.js');
var fs = require('fs');

function ExporterCodeBlocks() {

}

ExporterCodeBlocks.prototype = Object.create(Exporter.prototype);
ExporterCodeBlocks.constructor = ExporterCodeBlocks;

ExporterCodeBlocks.prototype.exportSolution = function (solution, from, to, platform) {
	var project = solution.getProjects()[0];

	this.writeFile(to.resolve(project.getName() + ".cbp"));
	this.p("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?>");
	this.p("<CodeBlocks_project_file>");
		this.p("<FileVersion major=\"1\" minor=\"6\" />", 1);
		this.p("<Project>", 1);
			this.p("<Option title=\"" + project.getName() + "\" />", 2);
			this.p("<Option pch_mode=\"2\" />", 2);
			this.p("<Option compiler=\"gcc\" />", 2);
			this.p("<Build>", 2);
				this.p("<Target title=\"Debug\">", 3);
					this.p("<Option output=\"bin/Debug/" + project.getName() + "\" prefix_auto=\"1\" extension_auto=\"1\" />", 4);
					if (project.getDebugDir().length > 0) this.p("<Option working_dir=\"" + from.resolve(Paths.get(project.getDebugDir())).toAbsolutePath().toString() + "\" />", 4);
					this.p("<Option object_output=\"obj/Debug/\" />", 4);
					this.p("<Option type=\"1\" />", 4);
					this.p("<Option compiler=\"gcc\" />", 4);
					this.p("<Compiler>", 4);
						this.p("<Add option=\"-g\" />", 5);
					this.p("</Compiler>", 4);
				this.p("</Target>", 3);
				this.p("<Target title=\"Release\">", 3);
					this.p("<Option output=\"bin/Release/" + project.getName() + "\" prefix_auto=\"1\" extension_auto=\"1\" />", 4);
					if (project.getDebugDir().length > 0) this.p("<Option working_dir=\"" + from.resolve(Paths.get(project.getDebugDir())).toAbsolutePath().toString() + "\" />", 4);
					this.p("<Option object_output=\"obj/Release/\" />", 4);
					this.p("<Option type=\"0\" />", 4);
					this.p("<Option compiler=\"gcc\" />", 4);
					this.p("<Compiler>", 4);
						this.p("<Add option=\"-O2\" />", 5);
					this.p("</Compiler>", 4);
					this.p("<Linker>", 4);
						this.p("<Add option=\"-s\" />", 5);
					this.p("</Linker>", 4);
				this.p("</Target>", 3);
			this.p("</Build>", 2);
			this.p("<Compiler>", 2);
				this.p("<Add option=\"-Wall\" />", 3);
				for (var d in project.getDefines()) {
					var def = project.getDefines()[d];
					this.p("<Add option=\"-D" + def.replaceAll("\"", "\\\"") + "\" />", 3);
				}
				for (var i in project.getIncludeDirs()) {
					var inc = project.getIncludeDirs()[i];
					this.p("<Add directory=\"" + from.resolve(Paths.get(inc)).toAbsolutePath().toString() + "\" />", 3);
				}
			this.p("</Compiler>", 2);
			this.p("<Linker>", 2);
                this.p("<Add option=\"-pthread\" />", 3);
				this.p("<Add library=\"GL\" />", 3);
				this.p("<Add library=\"X11\" />", 3);
				this.p("<Add library=\"asound\" />", 3);
				this.p("<Add library=\"dl\" />", 3);
			this.p("</Linker>", 2);
			for (var f in project.getFiles()) {
				var file = project.getFiles()[f];
				if (file.endsWith(".c") || file.endsWith(".cpp")) {
					this.p("<Unit filename=\"" + from.resolve(Paths.get(file)).toAbsolutePath().toString() + "\">", 2);
						this.p("<Option compilerVar=\"CC\" />", 3);
					this.p("</Unit>", 2);
				}
			}
			this.p("<Extensions>", 2);
				this.p("<code_completion />", 3);
				this.p("<debugger />", 3);
			this.p("</Extensions>", 2);
		this.p("</Project>", 1);
	this.p("</CodeBlocks_project_file>");
	this.closeFile();
};

module.exports = ExporterCodeBlocks;
