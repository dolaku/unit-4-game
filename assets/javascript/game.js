$(document).ready(function () {

    var game = {
        character: [
            {
                name: 'iceCream',
                health: 100,
                attack: 10,
                counterAttack: 20
            }, {
                name: 'apple',
                health: 140,
                attack: 12,
                counterAttack: 15
            }, {
                name: 'burger',
                health: 120,
                attack: 6,
                counterAttack: 5
            }, {
                name: 'avocado',
                health: 180,
                attack: 8,
                counterAttack: 10
            }
        ],
        selectCharacter: function () {
            $('.charGroup').on('click', function () {
                $(this).appendTo('#hero');
                
            });
        }
    }

    game.selectCharacter();
});
