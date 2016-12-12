export var note;

note = {
	new: `
		<div id="post-it-{{id}}" class="mdl-card mdl-shadow--8dp post-it">
			<div class="mdl-card__title mdl-card--expand">
				<input type="text" placeholder="Add title" class="add-title" id="add-title-{{id}}"></input>
			</div>
			<div class="mdl-card__supporting-text">
				<textarea cols="30" rows="10" placeholder="Add text" class="add-text" id="add-text-{{id}}"></textarea>
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<div class="mdl-layout-spacer"></div>
				<button class="mdl-button mdl-js-button mdl-button--icon" id="ok-{{id}}">
					<i class="material-icons mdl-color-text--green">done</i>
				</button>
				<button class="mdl-button mdl-js-button mdl-button--icon" id="cancel-{{id}}">
					<i class="material-icons mdl-color-text--red">close</i>
				</button>
			</div>
		</div>
	`,
	edit: `
		<div id="post-it-{{id}}" class="mdl-card mdl-shadow--8dp post-it">
			<div class="mdl-card__title mdl-card--expand">
				<input type="text" value="{{title}}" class="add-title" id="add-title-{{id}}"></input>
			</div>
			<div class="mdl-card__supporting-text">
				<textarea cols="30" rows="10" value="{{text}}" class="add-text" id="add-text-{{id}}">{{text}}</textarea>
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<div class="date">{{timeAgo}}</div>
				<div class="mdl-layout-spacer"></div>
				<button class="mdl-button mdl-js-button mdl-button--icon" id="ok-{{id}}">
					<i class="material-icons mdl-color-text--green">done</i>
				</button>
				<button class="mdl-button mdl-js-button mdl-button--icon" id="cancel-{{id}}">
					<i class="material-icons mdl-color-text--red">close</i>
				</button>
			</div>
		</div>
	`,
	fixed: `
		<div data-pos="{{position}}" data-fixed="true" id="post-it-{{id}}" class="mdl-card mdl-shadow--2dp post-it" draggable="true">
			<div class="mdl-card__title mdl-card--expand">
				<h2 class="mdl-card__title-text">{{title}}</h2>
			</div>
			<div class="mdl-card__supporting-text">
				{{text}}
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<div class="date">{{timeAgo}}</div>
				<div class="mdl-layout-spacer"></div>
				<button class="mdl-button mdl-js-button mdl-button--icon" id="edit-{{id}}">
					<i class="material-icons">edit</i>
				</button>
				<button class="mdl-button mdl-js-button mdl-button--icon" id="delete-{{id}}">
					<i class="material-icons">delete</i>
				</button>
			</div>
		</div>
	`,
	creator: `
		<div id="post-it-add" class="mdl-card mdl-shadow--2dp post-it">
			<div class="mdl-card__title mdl-card--expand">
				<h2 class="mdl-card__title-text"></h2>
			</div>
			<div class="mdl-card__supporting-text">
				<div class="mdl-button mdl-js-button mdl-button--icon add-icon-big">
					<i class="material-icons">add</i>
				</div>
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<div class="mdl-layout-spacer"></div>
				<div class="add-action-text">ADD NOTE</div>
			</div>
		</div>
	`
};