import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Output()
  videoIdChange = new EventEmitter<string>();
  videoID: string = ''
  sanitizedVideoUrl!: SafeResourceUrl;
  
  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Retrieve the id parameter from the route
    this.route.queryParams.subscribe(params => {
      this.videoID = params['v'];
      this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoID}?autoplay=1`);
      this.videoIdChange.emit(this.videoID);
    });
  }
}
