<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Friend') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-cyan-500 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @if ($friends->count()>1)
                        @foreach ($friends as $friend)
                            {{$friend->name}}
                        @endforeach
                    @else
                        {{__("Not friend")}}
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
