export var html;

html = `
{{#data}}
	<div id="post-it-{{id}}" class="mdl-card mdl-shadow--2dp post-it">
		<div class="mdl-card__title mdl-card--expand">
			<h2 class="mdl-card__title-text">{{title}}</h2>
		</div>
		<div class="mdl-card__supporting-text">
			{{text}}
		</div>
		<div class="mdl-card__actions mdl-card--border">
			<div class="mdl-layout-spacer"></div>
			<button class="mdl-button mdl-js-button mdl-button--icon">
				<i class="material-icons">edit</i>
			</button>
			<button class="mdl-button mdl-js-button mdl-button--icon">
				<i class="material-icons">delete</i>
			</button>
		</div>
	</div>
{{/data}}
`;