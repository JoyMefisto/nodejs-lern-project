$('document').ready(()=>{
    let listPlayers = [];

    $('#js_results_list_teams').on('click', (e) => {
        let btnRemove = $(e.target);

        if(btnRemove.is('.js_remove')) {
            btnRemove.closest('.item').remove();
        }
    });


    /**
     * @title Ajax request
     */
    $('#js_input_search_teams').on('keyup', (e) => {
        e.preventDefault();

        if($(e.target).val().split('').length <= 2) {
            containerHide('#js_results_dropdown_teams');
            return;
        }

        let data = $('#js_form_search_teams').serializeArray();

        $.ajax('/profile/tournaments/searchTournament', {
            method: "POST",
            data: data[1],
            success(result, textStatus, jqXHR){
                (result.length > 0) ? buildListDropdownPlayers(result, '#js_results_dropdown_teams') : buildNoResultOnSearchPlayer('#js_results_dropdown_teams');
            }
        })
    });

    $('#js_form_search_teams').on('click', '.js_add', (e) => {
        let
            event = $(e.currentTarget),
            item = event.closest('.item'),
            value = item.find('[name=team_id]').data('value'),
            form = event.closest('form'),
            url = form.attr('action'),
            tournament_id = form.find('[name=tournament_id]').attr('value');

        let data = {
            team_id: value._id,
            tournament_id: tournament_id,
            value
        };

        $.ajax(url, {
            method: "POST",
            data,
            success(result, textStatus, jqXHR) {
                let view = addedViewPlayerOnTeam(data);
                renderViewList(view, '#js_list_teams');
                item.remove();
            }
        })
    });

    function addedViewPlayerOnTeam(obj) {
        return $(`<div class="item">
                        <div class="content">${obj.value.name}
                            <input type="hidden" name="team_id" data-value=${JSON.stringify(obj.value)}>
                        </div>
                        <div class="content">
                            <div class="ui button red js_remove">Удалить</div>
                        </div>
                    </div>`)
    }

    /**
     * @title Checked element in dropdown
     */
    $('#js_results_dropdown_teams').on('click', '.title', function (e) {
        let elem = $(e.target);

        moveElementDropdown(elem.data('value'));
        $('#js_input_search_teams').val('');
    });

    /**
     * @title List Elements
     */
    function moveElementDropdown(obj) {
        listPlayers.push(obj);
        let viewElement = buildListView(obj);
        renderViewList(viewElement, '#js_results_list_teams');
        containerHide('#js_results_dropdown_teams');
    }
    function buildListView(obj) {
        return `<div class="item">
                    <div class="content">${obj.name}</div>
                    <input type="hidden" name="team_id" data-value=${JSON.stringify(obj)}>
                    <div class="content">
                      <div class="ui button js_add">Добавить</div>
                      <div class="ui button red js_remove">Убрать</div>
                    </div>
                </div>`
    }

    $('#js_list_teams').on('click', '.js_remove', (e) => {
        let
            event = $(e.currentTarget),
            item = event.closest('.item'),
            value = item.find('[name=team_id]').data('value'),
            form = event.closest('form'),
            url = form.attr('action'),
            tournament_id = form.find('[name=tournament_id]').attr('value');

        let data = {
            team_id: value._id,
            tournament_id: tournament_id,
            value
        };

        $.ajax(url, {
            method: "POST",
            data,
            success(result, textStatus, jqXHR) {
                item.remove();
            }
        })
    });
    /**
     * @title Dropdown
     */
    function buildListDropdownPlayers(data, container) {
        let view = data.length > 0 ? buildDropdownView(data) : buildNoResultOnSearchPlayer('#js_results_dropdown_teams');

        renderView(view, container);
        containerShow(container);
    };

    function buildDropdownView(data) {
        return data.map(el => {
            return $(`<a class=result>
                        <div class=content>
                          <div class=title data-value=${JSON.stringify(el)}>${el.name}</div>
                        </div>
                      </a>`)
        });
    };

});

function containerShow(container) {
    $(container).show();
}
function containerHide(container) {
    $(container).hide();
}

function buildNoResultOnSearchPlayer(container) {
    let result = buildViewNoResult();
    renderView(result, container);
    containerShow(container);
}
function buildViewNoResult() {
    return $(`<a class=result><div class=content><div class=title>Нет результата</div></div></a>`);
}

function renderView(view, container) {
    $(container).html(view);
};
function renderViewList(view, container) {
    $(container).append(view);
};