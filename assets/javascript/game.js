$(document).ready(function () {

/* ------ KNOWN BUGS ------
- Attacks and counterattack math is incorrect
    - hero attack is the sum of the current round and previous round 
        (hero becomes extremely overpowered)
    - counterattack is correct until an opponent swap

- Restart button
    - missing some resets on class additions/removals
    - need to link click listeners to allow choosing new opponent



*/

    var heroChosen = false;
    var villainChosen = false;
    var heroName;
    var heroHP;
    var enemiesRem = 3;
    var villainName;
    var villainHP;
    var attackCount = 0;
    var attackProgress = 0;
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

    // ----- FUNCTIONALITY -----

    // Pick hero if one isn't already chosen
    // Moves hero into Hero div && removes hover/active styles
    $('.char-group').on('click', function (hero, villain) {
        if (!heroChosen) {
            $(this).appendTo('#hero')
                .addClass('hero-player');
            $(this).find('img')
                .removeClass('selection');
            $(this).find('.hp-badge')
                .addClass('hp-badge-hero')
                .removeClass('hp-badge');
            $(this).addClass('char-group-hero')
                .removeClass('char-group');

            // Store Hero selection
            hero = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === hero) {
                    $('#your-hero').html('You chose<br><strong>' + value.name + '</strong>');
                }
                heroName = hero;
            });

            // Display enemies
            // Enemies remain in selection div && turns red (evil)
            // Setup opponent selection
            $('#top-text').html('Choose Your <span class="text-danger">Opponent');
            $('.selection').parent()
                .addClass('char-group-evil');
            $('.selection')
                .addClass('evil')
                .removeClass('selection');
            $('.hp-badge').addClass('hp-badge-evil');

            heroChosen = true;

        } else if (heroChosen && !villainChosen && enemiesRem === 3) {
            // Stage defenders
            // Pick opponent if one isn't already chosen AND hero is chosen

            var that = this;
            villainSet(that);

            dormantSet()

            villain = $(this).attr('id');
            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === villain) {
                    $('#your-villain').html('Your opponent is<br><strong>' + value.name + '</strong>');
                }
                villainName = villain;
            });

            villainChosen = true;

            // Display attack button
            $('#btn-fight').removeClass('d-none');
        }
    });

    // ----- ATTACK -----
    // Compare attack rating to defender rating
    // Determine damage
    $('#btn-fight').on('click', function (hero, villain) {
        Object.keys(character).forEach(function (key) {
            hero = character[key];
            villain = character[key];
            if (hero.id === heroName) {
                $('#your-hero').html('<strong>'
                    + hero.name.toUpperCase()
                    + '</strong>');

                // Update Attack results
                attackCount++;
                attackProgress = hero.attack * attackCount;
                $('#attack').html('Attacks for <strong>'
                    + attackProgress
                    + '</strong> damage!');
                heroHP = hero.health;
            }
            // Update counter-attack results
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

        console.log(heroHP + ' heroHP');
        console.log(villainHP + ' villainHP');
        console.log(counterAttack + ' counter');
        console.log(attackProgress + ' attack progress');

        // Update HP
        heroHP -= (counterAttack * attackCount);
        villainHP -= attackProgress * attackCount;
        $('.hp-badge-hero').find('.hp-digit')
            .html(heroHP);
        $('.villain').siblings().find('.hp-digit')
            .html(villainHP);

        console.log(heroHP + ' displayed hero HP');
        console.log(villainHP + ' displayed villain HP');
        console.log('----------')

        checkHP();
    }); // End ----- #btn-fight 'click'

    // Check HP levels
    // Update display
    function checkHP() {
        if (heroHP <= 0) {
            // LOSE!!
            // Game Over && restart option
            $('#btn-fight').html('<div class="villain-notes">You have been defeated by ' + villainName.toUpperCase() + '</div>');

            // Hide attack button
            $('#btn-fight').addClass('d-none');

            restart();

        } else if (villainHP <= 0) {
            // Defeated a villain
            villainChosen = false;

            // Hide attack button
            $('#btn-fight').addClass('d-none');

            // Defender is defeated -- 1 less enemy remains
            enemiesRem--;
            if (enemiesRem === 0) {
                // WIN!! Defeated everyone!!
                $('#top-text').html('Champion!')
                    .addClass('mb-5')
                    .css('color', '#209191');
                $('#attack').html('is undefeated!!');
                $('.villain-notes').empty();
                removeDefeated();

                graveyard();
                restart();

                // If there are still enemies remaining to fight
            } else {
                // Update user display
                $('#counter-attack').html('has been defeated');
                $('#top-text').html('Choose Your Next <span class="text-danger">Opponent');

                // Replace all villain classes with defeated classes
                // Allow new selection
                removeDefeated()
                chooseNext();
            }
        }
    } // End ----- checkHP()

    function villainSet(that) {
        // Villain moves to Defender
        // Remove all hover effects
        $('#top-text').empty();
        $(that).removeClass('char-group')
            .addClass('char-group-villain');
        $(that).find('img')
            .removeClass('evil')
            .addClass('villain');
        $(that).prependTo('#villain')
            .addClass('villain-player');
    }

    function dormantSet() {
        // Remaining enemies stay at top && shrink
        $('.evil').addClass('dormant')
            .removeClass('evil');
        $('.dormant').siblings()
            .css({ 'top': '-20%', 'right': '30%' });
        $('#char-wrapper').removeClass('mb-auto')
            .css('opacity', '0.85');
    }

    function chooseNext() {
        // Display opponent choices
        $('#char-wrapper').css('opacity', '1');
        $('.dormant').addClass('evil')
            .removeClass('dormant');
        $('#char-wrapper').find('.hp-badge-evil')
            .css({ 'top': '30px', 'right': '10px' });

        // Select new opponent
        $('.char-group-evil').on('click', function (villain) {
            if (!villainChosen && enemiesRem > 0) {
                // Create graveyard div && move defeated villain inside
                graveyard();

                var that = this;
                villainSet(that);
                dormantSet()

                // Store new Villain info
                // Reset villainHP
                villain = $(this).attr('id');
                Object.keys(character).forEach(function (key) {
                    var value = character[key];
                    if (value.id === villain) {
                        $('#your-villain').html('Your opponent is<br><strong>' + value.name + '</strong>');
                        $('#counter-attack').empty();
                        villainHP = value.health;
                    }
                });

                villainName = villain;
                villainChosen = true;

                // Display attack button
                $('#btn-fight').removeClass('d-none');
            }
        });
    } // End ----- chooseNext()

    function removeDefeated() {
        // Remove defeated defender
        $('.villain-player').unbind('click')
            .removeClass('char-group-evil');
        $('.villain').siblings()
            .addClass('hp-badge-defeated');
        $('.villain')
            .addClass('defeated')
            .addClass('evil')
            .removeClass('villain');
    }

    function graveyard() {
        $('#char-wrapper').prepend('<div id="graveyard"></div>');
        $('.villain-player').prependTo('#graveyard')
            .removeClass('villain-player');
        $('.defeated').siblings()
            .css({ 'top': '-20%', 'right': '30%' })
            .find('.hp-digit').html('X');
    }

    function restart() {
        $('#hero').addClass('flex-column').append('<div id="reset" class="rounded-circle m-2 pt-2">Play Again?</div>');

        $('#reset').on('click', function () {
            $('#reset').addClass('d-none');

            $('.hero-notes').empty();
            $('.villain-notes').empty();
            $('#top-text').html('Choose Your <span class="text-info">Character</span>').css('color', 'unset');

            $('.char-group-villain').addClass('char-group')
                .removeClass('char-group-villain');

            $('.char-group').appendTo('#char-wrapper');
            $('#char-wrapper').css('opacity','1');

            $('.character').addClass('selection')
                .removeClass('defeated')
                .removeClass('dormant')
                .removeClass('evil');

            $('.hp-badge').removeClass('hp-badge-evil')
                .removeClass('hp-badge-defeated')
                .css({'top': '40px', 'right': '21px'});

            $('#hero').removeClass('flex-column');

            $('.hero-player').appendTo('#char-wrapper').addClass('char-group')
                .removeClass('char-group-hero')
                .removeClass('hero-player');

            $('#graveyard').remove();
            $('#defeated').remove();

            Object.keys(character).forEach(function (key) {
                var value = character[key];
                if (value.id === 'iceCream') {
                    $('#iceCream').find('.hp-digit').html(value.health);
                } else if (value.id === 'apple') {
                    $('#apple').find('.hp-digit').html(value.health);
                } else if (value.id === 'burger') {
                    $('#burger').find('.hp-digit').html(value.health);
                } else if (value.id === 'avocado') {
                    $('#avocado').find('.hp-digit').html(value.health);
                }
            });

            heroChosen = false;
            villainChosen = false;
            enemiesRem = 3;
            attackCount = 0;
            attackProgress = 0;
        });
    }
});
