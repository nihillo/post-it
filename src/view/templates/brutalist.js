export var note;

note = {
	new: `
		<div id="post-it-{{id}}" class="note-brutalist">
			<div class="note-header">
				<input type="text" placeholder="Add title" class="add-title" id="add-title-{{id}}"></input>
			</div>
			<div class="note-body">
				<textarea cols="30" rows="10" placeholder="Add text" class="add-text" id="add-text-{{id}}"></textarea>
			</div>
			<div class="note-footer">
				<button class="" id="ok-{{id}}">
					DONE
				</button>
				<button class="" id="cancel-{{id}}">
					CANCEL
				</button>
			</div>
		</div>
	`,
	edit: `
		<div id="post-it-{{id}}" class="note-brutalist">
			<div class="note-header">
				<input type="text" value="{{title}}" class="add-title" id="add-title-{{id}}"></input>
			</div>
			<div class="note-body">
				<textarea cols="30" rows="10" value="{{text}}" class="add-text" id="add-text-{{id}}">{{text}}</textarea>
			</div>
			<div class="note-footer">
				<div class="date">{{timeAgo}}</div>
				<button class="" id="ok-{{id}}">
					DONE
				</button>
				<button class="" id="cancel-{{id}}">
					CANCEL
				</button>
			</div>
		</div>
	`,
	fixed: `
		<div data-pos="{{position}}" data-fixed="true" id="post-it-{{id}}" class="note-brutalist" draggable="true">
			<div class="note-header">
				<h2 class="">{{title}}</h2>
			</div>
			<div class="note-body">
				{{text}}
			</div>
			<div class="note-footer">
				<div class="date">{{timeAgo}}</div>
				<button class="" id="edit-{{id}}">
					EDIT
				</button>
				<button class="" id="delete-{{id}}">
					DELETE
				</button>
			</div>
		</div>
	`,
	creator: `
		<div id="post-it-add" class="note-brutalist">
			<div class="note-header">
				<h2 class=""></h2>
			</div>
			<div class="note-body">
				<div class="">
					+ ADD NOTE
				</div>
			</div>
			<div class="note-footer">
			</div>
		</div>
	`
};