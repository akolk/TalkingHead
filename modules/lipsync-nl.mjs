/**
* @class Dutch lip-sync processor
* @author Mika Suominen (translated to Dutch)
*/

class LipsyncNl {

  /**
  * @constructor
  */
  constructor() {

    // Dutch words to Oculus visemes
    this.rules = {
      'A': [
        "[A] =aa", " [AAN]=aa nn", "[AI]=E", "[AU]=aa"
      ],

      'B': [
        "[B]=PP"
      ],

      'C': [
        "[CH]=CH", "[C]=kk"
      ],

      'D': [
        "[D]=DD"
      ],

      'E': [
        "[EE]=E", "[EI]=I", "[E]=E"
      ],

      'F': [
        "[F]=FF"
      ],

      'G': [
        "[G]=kk"
      ],

      'H': [
        "[H]=I"
      ],

      'I': [
        "[IE]=I", "[I]=I"
      ],

      'J': [
        "[J]=kk"
      ],

      'K': [
        "[K]=kk"
      ],

      'L': [
        "[L]=nn"
      ],

      'M': [
        "[M]=PP"
      ],

      'N': [
        "[NG]=nn kk", "[N]=nn"
      ],

      'O': [
        "[OO]=O", "[OU]=aa", "[O]=O"
      ],

      'P': [
        "[P]=PP"
      ],

      'Q': [
        "[QU]=kk FF"
      ],

      'R': [
        "[R]=RR"
      ],

      'S': [
        "[SCH]=SS kk", "[S]=SS"
      ],

      'T': [
        "[TH]=TH", "[T]=DD"
      ],

      'U': [
        "[UU]=U", "[U]=U"
      ],

      'V': [
        "[V]=FF"
      ],

      'W': [
        "[W]=FF"
      ],

      'X': [
        "[X]=kk SS"
      ],

      'Y': [
        "[Y]=I"
      ],

      'Z': [
        "[Z]=SS"
      ]
    };

    const ops = {
      '#': '[AEIOUY]+',
      '.': '[BDVGJLMNRWZ]',
      '%': '(?:ER|E|ES|ED|ING|ELY)',
      '&': '(?:[SCGZXJ]|CH|SH)',
      '@': '(?:[TSRDLZNJ]|TH|CH|SH)',
      '^': '[BCDFGHJKLMNPQRSTVWXZ]',
      '+': '[EIY]',
      ':': '[BCDFGHJKLMNPQRSTVWXZ]*',
      ' ': '\\b'
    };

    Object.keys(this.rules).forEach( key => {
      this.rules[key] = this.rules[key].map( rule => {
        const posL = rule.indexOf('[');
        const posR = rule.indexOf(']');
        const posE = rule.indexOf('=');
        const strLeft = rule.substring(0,posL);
        const strLetters = rule.substring(posL+1,posR);
        const strRight = rule.substring(posR+1,posE);
        const strVisemes = rule.substring(posE+1);

        const o = { regex: '', move: 0, visemes: [] };

        let exp = '';
        exp += [...strLeft].map( x => ops[x] || x ).join('');
        const ctxLetters = [...strLetters];
        ctxLetters[0] = ctxLetters[0].toLowerCase();
        exp += ctxLetters.join('');
        o.move = ctxLetters.length;
        exp += [...strRight].map( x => ops[x] || x ).join('');
        o.regex = new RegExp(exp);

        if ( strVisemes.length ) {
          strVisemes.split(' ').forEach( viseme => {
            o.visemes.push(viseme);
          });
        }

        return o;
      });
    });

    this.visemeDurations = {
      'aa': 0.95, 'E': 0.90, 'I': 0.92, 'O': 0.96, 'U': 0.95, 'PP': 1.08,
      'SS': 1.23, 'TH': 1, 'DD': 1.05, 'FF': 1.00, 'kk': 1.21, 'nn': 0.88,
      'RR': 0.88, 'sil': 1
    };

    this.specialDurations = { ' ': 1, ',': 3, '-':0.5, "'":0.5 };
  }
}
