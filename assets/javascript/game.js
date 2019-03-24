$(document).ready(function () {
    var gameStart = false;
    var heroChosen = false;
    var villainChosen = false;
    var heroName;
    var heroHP;
    var villainName;
    var villainHP;
    var attackCount = 0;
    var attackProgress;
    var counterAttack;

    var character = {
        iceCream: {
            id: 'iceCream',
            name: 'Ice Cream',
            health: 100,
            attack: 12,
            counterAttack: 20
        },
        burger: {
            id: 'burger',
            name: 'Burger',
            health: 120,
            attack: 10,
            counterAttack: 25
        },
        apple: {
            id: 'apple',
            name: 'Apple',
            health: 140,
            attack: 6,
            counterAttack: 15
        },
        avocado: {
            id: 'avocado',
            name: 'Avocado',
            health: 180,
            attack: 8,
            counterAttack: 18
        }
    }

    if (gameStart) {

    }

    // ----- FUNCTIONALITY ----- 

    // 1. Display characters to select Hero --- created in HTML
    $('.char-group').on('click', function (hero, villain) {
        // Pick hero if one isn't already chosen
        if (!heroChosen) {
            // moves hero into Hero div && removes hover/active styles
            $(this).appendTo('#hero')
                .addClass('hero-player');
            $(this).find('img')
                .removeClass('selection');
            $(this).find('.hp-badge')
                .addClass('hp-badge-hero')
                .removeClass('hp-badge');
            $(this).addClass('char-group-hero')
                .removeClass('char-group');

            // 2. Display Hero selection
            hero = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === hero) {
                    $('#your-hero').html('You chose<br><strong>' + value.name + '</strong>');
                }
                heroName = hero;
            });

            // 3. Display enemies
            //      a. enemies remain in selection div && turns red (evil)
            //      b. setup opponent selection
            $('#top-text').html('Choose Your <span class="text-danger">Opponent');
            $('.selection').parent()
                .addClass('char-group-evil');
            $('.selection')
                .addClass('evil')
                .removeClass('selection');
            $('.hp-badge').addClass('hp-badge-evil');

            heroChosen = true;
            
        } else if (heroChosen && !villainChosen) {
            // 4. Stage defenders
            //      a. Pick opponent if one isn't already chosen AND hero is chosen
            //      b. Hero character cannot be picked
            $('.hero-player').on('click', function(event){
                event.preventDefault();
            });
            console.log(this);
            console.log($(this));

            //      c. Villain moves to Defender
            //      d. remove all hover effects
            $('#top-text').html('');
            $(this).removeClass('char-group')
                .addClass('char-group-villain');
            $(this).find('img')
                .removeClass('evil')
                .addClass('villain');
            $(this).prependTo('#villain')
                .addClass('villain-player');

            //      e. remaining enemies stay at top && shrink
            $('.evil').addClass('dormant')
                .removeClass('evil');
            $('.dormant').siblings()
                .css({ 'top': '-20%', 'right': '30%' });
            $('#char-wrapper').removeClass('mb-auto')
                .css('opacity', '0.85');

            villain = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === villain) {
                    $('#your-villain').html('Your opponent is<br><strong>' + value.name + '</strong>');
                }
                villainName = villain;
            });

            villainChosen = true;

            // 5. Display attack button
            $('#btn-fight').removeClass('d-none');
        }
    });

    // 6.  ATTACK
    //     a. compare attack rating to defender rating
    //     b. determine damage
    $('#btn-fight').on('click', function (hero, villain) {
        Object.keys(character).forEach(function (key) {
            hero = character[key];
            villain = character[key];
            if (hero.id === heroName) {
                $('#your-hero').html('<strong>'
                    + hero.name.toUpperCase()
                    + '</strong>');

                //     c. update Attack results
                attackCount++;
                $('#attack').html('Attacks for <strong>'
                    + hero.attack * attackCount
                    + '</strong> damage!');
                attackProgress = hero.attack * attackCount;
                heroHP = hero.health;
            }

            if (villain.id === villainName) {
                $('#your-villain').html('<strong>'
                    + villain.name.toUpperCase()
                    + '</strong>');
                $('#counter-attack').html('Attacks for <strong>'
                    + villain.counterAttack
                    + '</strong> damage!');
                counterAttack = villain.counterAttack;
                villainHP = villain.health;
            }

        });
        //    d. update HP
        heroHP -= counterAttack * attackCount;
        villainHP -= attackProgress * attackCount;
        $('.hp-badge-hero').find('.hp-digit').html(heroHP);
        $('.villain').siblings().find('.hp-digit').html(villainHP);
    });




    //     e. check outcome
    //     f. Update display
    //         i. is attacker defeated
    //             a. Game Over
    //             b. Allow user to reset - display restart button
    //         ii. is defender defeated
    //             a. remove defender
    //             b. allow new enemy selection - if there isn't on already selected

});
