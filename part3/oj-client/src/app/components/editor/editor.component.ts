import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java'; // default

  sessionId: string;

  defaultContent = {
    'Java':
    `public class Solution {
    public static void main(String[] args) {
      // Type your Java code here
    }
}`, 'C++':
    `#include <iostream>
using namespace std;
int main() {
  // Type your C++ code here
  return 0;
}`, 'Python':
    `class Solution
    def example
    # Type your Python code here`
  };

  modes = {
    'Java': 'java',
    'C++': 'c_cpp',
    'Python': 'python'
  }

  constructor(@Inject('collaboration') private collaboration,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id']; // use problem id as marker
      this.initEditor();
    });
  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    this.collaboration.init();

    document.getElementsByTagName('textarea')[0].focus(); // edit codes directly

    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        // have new changes
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.modes[this.language]);
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit(): void {
    let user_code = this.editor.getValue(); // get code in ace
    console.log(user_code);
  }

}
