$(document).ready(function () {
    var hero = false;
    var villain = false;

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
        selectHero: function () {
            $('.charGroup').on('click', function () {
                //moves hero to bottom of screen && removes hover effects
                $(this).appendTo('#hero').addClass('heroPlayer');
                $(this).find('img').removeClass('selection');
                $(this).find('.hpBadge').addClass('hpBadge-hero').removeClass('hpBadge');
                $(this).addClass('charGroup-hero').removeClass('charGroup');

                //setup opponent selection
                $('#topText').html('Choose Your <span class="text-danger">Opponent');
                // $('#charWrapper').removeClass('flex-wrap');
                $('.selection').addClass('evil').removeClass('selection');
                $('.hpBadge').addClass('hpBadge-evil');

                
                hero = true;
            });
        },
        selectVillain: function () {
            $('.charGroup').on('click', function () {
                $(this).removeClass('charGroup').addClass('charGroup-villain');
                $(this).appendTo('#villain').addClass('villainPlayer');

                $('.charGroup')
            });
        }
    }


    if ( !hero ) {
        game.selectHero();
    }
    if ( hero && !villain ) {
        game.selectVillain();
    }
});
