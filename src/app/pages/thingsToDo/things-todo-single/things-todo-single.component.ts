import { Component } from '@angular/core';

@Component({
  selector: 'app-things-todo-single',
  templateUrl: './things-todo-single.component.html',
  styleUrls: ['./things-todo-single.component.scss']
})
export class ThingsTodoSingleComponent {
  highlights: Highlight[] = [
    {
      title: 'Anuradhapura',
      subtitle: '(UNESCO World Heritage Site)',
      description: 'A historic city featuring ancient stupas, monasteries, and the sacred Jaya Sri Maha Bodhi tree, symbolizing Sri Lanka\'s rich Buddhist heritage.',
      type: 'unesco'
    },
    {
      title: 'Sigiriya Rock Fortress',
      subtitle: '(UNESCO World Heritage Site)',
      description: 'A 5th-century rock fortress featuring ancient frescoes, gardens, and panoramic views from its summit.',
      type: 'unesco'
    },
    {
      title: 'Polonnaruwa',
      subtitle: '(UNESCO World Heritage Site)',
      description: 'A well-preserved ancient city showcasing stunning ruins of palaces, temples, and Buddha statues.',
      type: 'unesco'
    },
    {
      title: 'Minneriya Jeep Safari',
      description: 'A thrilling wildlife experience famous for the annual elephant gathering and diverse fauna.',
      type: 'safari'
    },
    {
      title: 'Dambulla Caves',
      subtitle: '(UNESCO World Heritage Site)',
      description: 'A historic cave temple complex adorned with Buddhist murals and over 150 statues.',
      type: 'unesco'
    },
    {
      title: 'Nuwara Eliya City Tour',
      description: 'A journey through Sri Lanka\'s "Little England," featuring colonial charm and lush landscapes.',
      type: 'tour'
    },
    {
      title: 'Scenic Train Ride from Kandy to Ella',
      description: 'A picturesque journey through lush tea plantations, misty mountains, and charming countryside.',
      type: 'transport'
    }
  ];
  
  onPlanVisit(): void {
    // Handle plan visit button click
    console.log('Plan Your Visit clicked');
    // Add your navigation or modal logic here
  }

  // Optional: Add methods for animations or interactions
  onHeroImageLoad(): void {
    console.log('Hero image loaded');
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'unesco':
        return 'fas fa-landmark';
      case 'safari':
        return 'fas fa-binoculars';
      case 'tour':
        return 'fas fa-map-marked-alt';
      case 'transport':
        return 'fas fa-train';
      default:
        return 'fas fa-check';
    }
  }

  trackByTitle(index: number, item: Highlight): string {
    return item.title;
  }
}

export interface Highlight {
  title: string;
  subtitle?: string;
  description: string;
  type: 'unesco' | 'safari' | 'tour' | 'transport';
}
